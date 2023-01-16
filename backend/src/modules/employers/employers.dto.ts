import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// -------------------- Private Classes -------------------- //
class UpdateEmployerUserDto {
  @IsNotEmpty()
  @IsInt()
  userId!: number;
}
class UpdateEmployerListingDto {
  @IsNotEmpty()
  @IsInt()
  employerListingId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreateEmployerDto {
  @IsNotEmpty()
  @IsString()
  companyName!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  // ---------- Relationships ---------- //
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateEmployerUserDto)
  user!: UpdateEmployerUserDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingDto)
  listings?: UpdateEmployerListingDto[];
}

export class UpdateEmployerDto {
  @IsNotEmpty()
  @IsInt()
  employerId!: number;

  @IsOptional()
  @IsString()
  companyName!: string;

  @IsOptional()
  @IsString()
  country!: string;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  description!: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEmployerUserDto)
  user?: UpdateEmployerUserDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingDto)
  listings?: UpdateEmployerListingDto[];
}
