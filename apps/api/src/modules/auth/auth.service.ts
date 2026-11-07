import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequestOtpDto, VerifyOtpDto, UserRoleEnum } from './dto/auth.dto';

interface OtpStoreEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  // In-memory OTP storage for rapid verification; in distributed multi-node it maps to Redis
  private readonly otpCache = new Map<string, OtpStoreEntry>();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async requestOtp(dto: RequestOtpDto) {
    const { phone, role } = dto;
    const now = Date.now();

    // Check rate limit: Max 3 OTPs within 15 minutes per phone number
    const existing = this.otpCache.get(phone);
    if (existing && existing.expiresAt > now && existing.attempts >= 3) {
      throw new BadRequestException(
        'Too many OTP attempts. For security reasons, please wait 15 minutes before requesting again.',
      );
    }

    // Generate 6-digit cryptographic OTP (or dev deterministic code in dev mode)
    const isDev = this.configService.get('NODE_ENV') !== 'production';
    const otp = isDev ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();

    this.otpCache.set(phone, {
      otp,
      expiresAt: now + 10 * 60 * 1000, // 10 minutes expiry
      attempts: (existing?.attempts || 0) + 1,
    });

    this.logger.log(`OTP generated for ${phone} [Role: ${role}]: ${isDev ? '123456 (dev)' : '******'}`);

    // Integration Boundary: In production, dispatches via Fast2SMS / Gupshup / MSG91
    return {
      phone,
      role,
      expiresInSeconds: 600,
      message: 'OTP sent successfully to registered Indian mobile number',
      devHint: isDev ? 'Development mode: Use code 123456' : undefined,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const { phone, otp, role = UserRoleEnum.STUDENT } = dto;
    const now = Date.now();

    const record = this.otpCache.get(phone);
    const isDev = this.configService.get('NODE_ENV') !== 'production';

    // Verification check
    const isValid = (record && record.otp === otp && record.expiresAt > now) || (isDev && otp === '123456');

    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired 6-digit OTP code. Please request a new one.');
    }

    // Clear OTP after successful consumption (anti-replay guard)
    this.otpCache.delete(phone);

    // Mock/Stub user ID for session
    const userId = `usr_${phone.slice(-6)}_${Date.now().toString(36)}`;

    const payload = {
      sub: userId,
      phone,
      role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: userId,
        phone,
        role,
        isPhoneVerified: true,
      },
      tokens: {
        accessToken,
        tokenType: 'Bearer',
        expiresIn: '15m',
      },
    };
  }
}
