import { Controller, Post, Body, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { EnquiriesService } from './enquiries.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class CreateEnquiryDto {
  @ApiProperty({ example: 'p1' })
  @IsString()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty({ example: 'Hi, is double sharing room vacant from 1st of next month?' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

class ScheduleVisitDto {
  @ApiProperty({ example: 'p1' })
  @IsString()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty({ example: '2026-11-15' })
  @IsString()
  @IsNotEmpty()
  preferredDate: string;

  @ApiProperty({ example: '11:00 AM - 1:00 PM' })
  @IsString()
  @IsNotEmpty()
  preferredTimeSlot: string;
}

@ApiTags('Enquiries & Visits')
@Controller()
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post('enquiries')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send direct message/inquiry to property owner (Zero Brokerage)' })
  async createEnquiry(
    @Body() dto: CreateEnquiryDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.enquiriesService.createEnquiry(dto.propertyId, userId, dto.message);
  }

  @Post('visits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule in-person physical property visit' })
  async scheduleVisit(
    @Body() dto: ScheduleVisitDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.enquiriesService.scheduleVisit(
      dto.propertyId,
      userId,
      dto.preferredDate,
      dto.preferredTimeSlot,
    );
  }
}
