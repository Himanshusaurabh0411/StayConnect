import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum RoommateLookingForEnum {
  FLATMATES_TO_RENT = 'flatmates_to_rent',
  ROOMMATE_FOR_MY_FLAT = 'roommate_for_my_flat',
  ROOM_IN_SHARED_FLAT = 'room_in_shared_flat',
}

export class SearchRoommatesDto {
  @ApiPropertyOptional({ example: 'Bangalore' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ enum: RoommateLookingForEnum })
  @IsOptional()
  @IsEnum(RoommateLookingForEnum)
  lookingFor?: RoommateLookingForEnum;

  @ApiPropertyOptional({ example: 15000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxBudget?: number;

  @ApiPropertyOptional({ example: 'veg' })
  @IsOptional()
  @IsString()
  foodPreference?: string;
}

export class CreateRoommateProfileDto {
  @ApiProperty({ enum: RoommateLookingForEnum })
  @IsEnum(RoommateLookingForEnum)
  lookingFor: RoommateLookingForEnum;

  @ApiProperty({ example: 'Arjun M.' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 24 })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  occupationDetail: string;

  @ApiProperty({ example: 'Bangalore' })
  @IsString()
  city: string;

  @ApiProperty({ example: ['Koramangala', 'HSR Layout'] })
  @IsArray()
  preferredLocalities: string[];

  @ApiProperty({ example: 8000 })
  @IsNumber()
  monthlyBudgetMin: number;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  monthlyBudgetMax: number;

  @ApiProperty({ example: 'both' })
  @IsString()
  foodPreference: string;

  @ApiProperty({ example: 'no_smoking' })
  @IsString()
  smokingPreference: string;

  @ApiProperty({ example: 'Looking for a calm, clean flatmate working regular tech hours.' })
  @IsString()
  introduction: string;
}

export class SendConnectionRequestDto {
  @ApiProperty({ example: 'Hey, I am also looking to rent a 2BHK near Koramangala. Would love to connect!' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
