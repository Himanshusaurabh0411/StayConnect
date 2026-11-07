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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { SearchPropertiesDto, CreatePropertyDto } from './dto/properties.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiOperation({ summary: 'Search and filter accommodations across India' })
  @ApiResponse({ status: 200, description: 'Filtered properties retrieved' })
  async search(@Query() dto: SearchPropertiesDto) {
    return this.propertiesService.search(dto);
  }

  @Get(':slugOrId')
  @ApiOperation({ summary: 'Retrieve comprehensive property details by slug or ID' })
  @ApiResponse({ status: 200, description: 'Property details found' })
  async findOne(@Param('slugOrId') slugOrId: string) {
    return this.propertiesService.findBySlugOrId(slugOrId);
  }

  @Get(':slugOrId/cost-calculator')
  @ApiOperation({ summary: 'Get True Cost breakdown and all-inclusive expense forecast' })
  async getCostCalculator(@Param('slugOrId') slugOrId: string) {
    return this.propertiesService.getTrueCostCalculation(slugOrId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner', 'manager', 'admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Publish new accommodation listing (Owner/Manager role)' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  async create(
    @Body() dto: CreatePropertyDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.propertiesService.create(dto, userId);
  }
}
