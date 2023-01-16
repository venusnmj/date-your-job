import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// -------------------- Private Classes -------------------- //
class UpdatePromptResponsePromptDto {
  @IsNotEmpty()
  @IsInt()
  promptId!: number;
}
class UpdatePromptResponseApplicantDto {
  @IsNotEmpty()
  @IsInt()
  applicantId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreatePromptResponseDto {
  @IsNotEmpty()
  @IsString()
  description!: string;

  // ---------- Relationships ---------- //
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdatePromptResponsePromptDto)
  prompt!: UpdatePromptResponsePromptDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdatePromptResponseApplicantDto)
  applicant!: UpdatePromptResponseApplicantDto;
}

export class UpdatePromptResponseDto {
  @IsNotEmpty()
  @IsInt()
  promptResponseId!: number;

  @IsOptional()
  @IsString()
  description?: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePromptResponsePromptDto)
  prompt?: UpdatePromptResponsePromptDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePromptResponseApplicantDto)
  applicant?: UpdatePromptResponseApplicantDto;
}
