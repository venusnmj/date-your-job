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
class UpdateEmployerListingTechDto {
  @IsNotEmpty()
  @IsInt()
  techId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreateEmployerListingDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsString()
  jobType!: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingTechDto)
  tech?: UpdateEmployerListingTechDto[];
}

export class UpdateEmployerListingDto {
  @IsNotEmpty()
  @IsInt()
  employerListingId!: number;

  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  jobType!: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingTechDto)
  tech?: UpdateEmployerListingTechDto[];
}
