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
class UpdatePromptPromptResponseDto {
  @IsNotEmpty()
  @IsInt()
  promptResponseId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreatePromptDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdatePromptPromptResponseDto)
  promptResponses?: UpdatePromptPromptResponseDto[];
}

export class UpdatePromptDto {
  @IsNotEmpty()
  @IsInt()
  promptId!: number;

  @IsOptional()
  @IsString()
  title?: string;

  // ---------- Relationships ---------- //
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdatePromptPromptResponseDto)
  promptResponses?: UpdatePromptPromptResponseDto[];
}
