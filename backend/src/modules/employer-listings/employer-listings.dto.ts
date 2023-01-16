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
class UpdateEmployerListingApplicationsDto {
  @IsNotEmpty()
  @IsInt()
  applicationId!: number;
}
class UpdateEmployerListingEmployerDto {
  @IsNotEmpty()
  @IsInt()
  employerId!: number;
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

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingApplicationsDto)
  applications?: UpdateEmployerListingApplicationsDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateEmployerListingEmployerDto)
  employer!: UpdateEmployerListingEmployerDto;
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

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateEmployerListingApplicationsDto)
  applications?: UpdateEmployerListingApplicationsDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEmployerListingEmployerDto)
  employer?: UpdateEmployerListingEmployerDto;
}
