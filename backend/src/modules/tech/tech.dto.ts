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
class UpdateTechApplicantDto {
  @IsNotEmpty()
  @IsInt()
  applicantId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreateTechDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  source!: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateTechApplicantDto)
  applicants?: UpdateTechApplicantDto[];
}

export class UpdateTechDto {
  @IsNotEmpty()
  @IsInt()
  techId!: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  source?: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateTechApplicantDto)
  applicants?: UpdateTechApplicantDto[];
}
