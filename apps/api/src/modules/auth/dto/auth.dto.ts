import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, IsEnum, IsOptional, Length } from 'class-validator';

export enum UserRoleEnum {
  STUDENT = 'student',
  OWNER = 'owner',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export class RequestOtpDto {
  @ApiProperty({ example: '9876543210', description: '10-digit Indian Mobile Number' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Must be a valid 10-digit Indian mobile number starting with 6-9' })
  phone: string;

  @ApiProperty({ enum: UserRoleEnum, example: UserRoleEnum.STUDENT })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '9876543210' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/)
  phone: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP' })
  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @ApiProperty({ enum: UserRoleEnum, required: false })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;
}
