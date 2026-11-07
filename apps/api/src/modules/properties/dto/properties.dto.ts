import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PropertyTypeEnum {
  PG = 'pg',
  HOSTEL = 'hostel',
  SHARED_ROOM = 'shared_room',
  SINGLE_ROOM = 'single_room',
  FLAT = 'flat',
  APARTMENT = 'apartment',
  INDEPENDENT_HOUSE = 'independent_house',
  COLIVING = 'coliving',
  PRIVATE_RENTAL = 'private_rental',
}

export enum GenderPreferenceEnum {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export enum FurnishingStatusEnum {
  FURNISHED = 'furnished',
  SEMI_FURNISHED = 'semi_furnished',
  UNFURNISHED = 'unfurnished',
}

export class SearchPropertiesDto {
  @ApiPropertyOptional({ example: 'Bangalore' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Koramangala' })
  @IsOptional()
  @IsString()
  locality?: string;

  @ApiPropertyOptional({ example: '560034' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ enum: PropertyTypeEnum })
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  type?: PropertyTypeEnum;

  @ApiPropertyOptional({ enum: GenderPreferenceEnum })
  @IsOptional()
  @IsEnum(GenderPreferenceEnum)
  gender?: GenderPreferenceEnum;

  @ApiPropertyOptional({ example: 4000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRent?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxRent?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  verifiedOnly?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  foodIncluded?: boolean;

  @ApiPropertyOptional({ example: 'rent_low', enum: ['rent_low', 'rent_high', 'best_rated', 'recently_added'] })
  @IsOptional()
  @IsString()
  sortBy?: 'rent_low' | 'rent_high' | 'best_rated' | 'recently_added';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class CreatePropertyDto {
  @ApiProperty({ example: 'Sunrise PG for Boys' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: PropertyTypeEnum, example: PropertyTypeEnum.PG })
  @IsEnum(PropertyTypeEnum)
  type: PropertyTypeEnum;

  @ApiProperty({ example: 'Comfortable paying guest with high-speed Wi-Fi and 3-time daily meals.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Koramangala 4th Block' })
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty({ example: 'Bangalore' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Karnataka' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '560034' })
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @ApiProperty({ example: 8500 })
  @Type(() => Number)
  @IsNumber()
  monthlyRentMin: number;

  @ApiProperty({ example: 12000 })
  @Type(() => Number)
  @IsNumber()
  monthlyRentMax: number;

  @ApiProperty({ example: 15000 })
  @Type(() => Number)
  @IsNumber()
  securityDeposit: number;

  @ApiProperty({ enum: GenderPreferenceEnum, example: GenderPreferenceEnum.MALE })
  @IsEnum(GenderPreferenceEnum)
  genderPreference: GenderPreferenceEnum;

  @ApiProperty({ enum: FurnishingStatusEnum, example: FurnishingStatusEnum.FURNISHED })
  @IsEnum(FurnishingStatusEnum)
  furnishingStatus: FurnishingStatusEnum;

  @ApiProperty({ example: 24 })
  @Type(() => Number)
  @IsNumber()
  totalBeds: number;

  @ApiProperty({ example: 4 })
  @Type(() => Number)
  @IsNumber()
  availableBeds: number;

  @ApiProperty({ example: ['Wi-Fi', 'AC', 'Food', 'Laundry'] })
  @IsArray()
  amenities: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  hasFood: boolean;
}
