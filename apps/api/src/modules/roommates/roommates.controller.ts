import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { RoommatesService } from './roommates.service';
import { SearchRoommatesDto, SendConnectionRequestDto } from './dto/roommates.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

class RespondRequestDto {
  @ApiProperty({ enum: ['accept', 'reject'], example: 'accept' })
  @IsString()
  @IsIn(['accept', 'reject'])
  action: 'accept' | 'reject';
}

class SendMessageDto {
  @ApiProperty({ example: 'Hi! Let us meet tomorrow at Starbucks Koramangala to discuss flat details.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

class ReportUserDto {
  @ApiProperty({ example: 'usr_123' })
  @IsString()
  @IsNotEmpty()
  reportedUserId: string;

  @ApiProperty({ example: 'Inappropriate language / spam request' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

@ApiTags('Roommates')
@Controller('roommates')
export class RoommatesController {
  constructor(private readonly roommatesService: RoommatesService) {}

  @Get()
  @ApiOperation({ summary: 'Discover roommates with compatibility scoring and masked privacy' })
  async search(
    @Query() dto: SearchRoommatesDto,
    @CurrentUser('userId') currentUserId?: string,
  ) {
    return this.roommatesService.search(dto, currentUserId);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Roommate dashboard: incoming requests, sent requests & connected roommates' })
  async getDashboard(@CurrentUser('userId') currentUserId: string) {
    return this.roommatesService.getDashboard(currentUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'View public roommate profile with privacy safeguards' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('userId') currentUserId?: string,
  ) {
    return this.roommatesService.findById(id, currentUserId);
  }

  @Post(':id/connect')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send roommate connection request' })
  async sendConnect(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: SendConnectionRequestDto,
  ) {
    return this.roommatesService.sendConnectionRequest(id, userId, dto);
  }

  @Post('requests/:id/respond')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept or decline incoming connection request (Reveals contact upon accept)' })
  async respondToRequest(
    @Param('id') requestId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: RespondRequestDto,
  ) {
    return this.roommatesService.respondToRequest(requestId, userId, dto.action);
  }

  @Get('conversations/:id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get direct chat messages for mutual connection' })
  async getMessages(@Param('id') conversationId: string) {
    return this.roommatesService.getMessages(conversationId);
  }

  @Post('conversations/:id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send direct message to connected roommate' })
  async sendMessage(
    @Param('id') conversationId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.roommatesService.sendMessage(conversationId, userId, dto.content);
  }

  @Post('report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Report a user for spam or inappropriate behavior' })
  async reportUser(
    @CurrentUser('userId') userId: string,
    @Body() dto: ReportUserDto,
  ) {
    return this.roommatesService.reportUser(dto.reportedUserId, userId, dto.reason);
  }
}
