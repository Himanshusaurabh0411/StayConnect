import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class VerificationDecisionDto {
  @ApiProperty({ enum: ['approved', 'rejected'], example: 'approved' })
  @IsString()
  @IsIn(['approved', 'rejected'])
  decision: 'approved' | 'rejected';

  @ApiProperty({ example: 'Verified against municipal property tax receipt and ground audit report.' })
  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateReviewDto {
  @ApiProperty({ example: 'p1' })
  @IsString()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty({ example: 'Sunrise PG for Boys' })
  @IsString()
  @IsNotEmpty()
  propertyName: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  overallRating: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  cleanliness: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  foodQuality: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  ownerBehavior: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  waterSupply: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  electricity: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  security: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  maintenance: number;

  @ApiProperty({ example: 'Great stay for students. The food is clean and Wi-Fi is reliable.' })
  @IsString()
  @IsNotEmpty()
  reviewText: string;
}

class ResolveReportDto {
  @ApiProperty({ enum: ['resolved', 'dismissed'], example: 'resolved' })
  @IsString()
  @IsIn(['resolved', 'dismissed'])
  resolution: 'resolved' | 'dismissed';

  @ApiProperty({ example: 'Unverified listing removed from public discovery. Warning issued to owner.' })
  @IsOptional()
  @IsString()
  notes?: string;
}

@ApiTags('Trust, Verification & Admin')
@Controller()
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  // --- Public / Tenant Review Endpoints ---
  @Get('reviews')
  @ApiOperation({ summary: 'List all verified resident reviews' })
  async getReviews() {
    return this.verificationService.getReviews();
  }

  @Post('reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit authenticated resident review with multi-category ratings' })
  async submitReview(
    @CurrentUser('userId') userId: string,
    @CurrentUser('phone') phone: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.verificationService.submitReview({
      ...dto,
      userId,
      userName: `Verified Tenant (+91 ${phone.slice(0, 5)}***)`,
      isVerifiedResident: true,
    });
  }

  // --- Admin Moderation & Verification Endpoints ---
  @Get('admin/verifications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List pending Level 2, 3 & 4 property verification submissions' })
  async getPendingVerifications() {
    return this.verificationService.getPendingVerifications();
  }

  @Patch('admin/verifications/:id/decision')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve or reject property verification document' })
  async processVerification(
    @Param('id') id: string,
    @Body() dto: VerificationDecisionDto,
  ) {
    return this.verificationService.processVerificationDecision(
      id,
      dto.decision,
      dto.notes,
    );
  }

  @Get('admin/reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List fraud reports and tenant complaints queue' })
  async getReports() {
    return this.verificationService.getReports();
  }

  @Patch('admin/reports/:id/resolve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Action fraud report or complaint with resolution notes' })
  async resolveReport(
    @Param('id') id: string,
    @Body() dto: ResolveReportDto,
  ) {
    return this.verificationService.resolveReport(id, dto.resolution, dto.notes);
  }

  @Get('admin/analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch nationwide platform health, verification stats, and brokerage savings' })
  async getAnalytics() {
    return this.verificationService.getPlatformAnalytics();
  }
}
