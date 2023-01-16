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
class UpdateApplicantUserDto {
  @IsNotEmpty()
  @IsInt()
  userId!: number;
}
class UpdateApplicantTechDto {
  @IsNotEmpty()
  @IsInt()
  techId!: number;
}
class UpdateApplicantApplicationsDto {
  @IsNotEmpty()
  @IsInt()
  applicationId!: number;
}
class UpdateApplicantPromptResponseDto {
  @IsNotEmpty()
  @IsInt()
  promptResponseId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreateApplicantDto {
  @IsNotEmpty()
  @IsString()
  fullname!: string;

  @IsNotEmpty()
  @IsInt()
  age!: number;

  @IsNotEmpty()
  @IsString()
  gender!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  personalSite?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  // ---------- Relationships ---------- //
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateApplicantUserDto)
  user!: UpdateApplicantUserDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantTechDto)
  topTech?: UpdateApplicantTechDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantApplicationsDto)
  applications?: UpdateApplicantApplicationsDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantPromptResponseDto)
  promptResponses?: UpdateApplicantPromptResponseDto[];
}

export class UpdateApplicantDto {
  @IsNotEmpty()
  @IsInt()
  applicantId!: number;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  personalSite?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateApplicantUserDto)
  user?: UpdateApplicantUserDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantTechDto)
  topTech?: UpdateApplicantTechDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantApplicationsDto)
  applications?: UpdateApplicantApplicationsDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateApplicantPromptResponseDto)
  promptResponses?: UpdateApplicantPromptResponseDto[];
}
