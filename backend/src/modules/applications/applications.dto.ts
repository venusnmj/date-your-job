import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApplicationStatusEnum } from '../../entities/application.entity';

// -------------------- Private Classes -------------------- //
class UpdateApplicationApplicantDto {
  @IsNotEmpty()
  @IsInt()
  applicantId!: number;
}
class UpdateApplicationEmployerListingDto {
  @IsNotEmpty()
  @IsInt()
  employerListingId!: number;
}

// -------------------- CRUD DTO -------------------- //
export class CreateApplicationDto {
  @IsNotEmpty()
  @IsEnum(ApplicationStatusEnum)
  status!: ApplicationStatusEnum;

  // ---------- Relationships ---------- //
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateApplicationApplicantDto)
  applicant!: UpdateApplicationApplicantDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateApplicationEmployerListingDto)
  employerListing!: UpdateApplicationEmployerListingDto;
}

export class UpdateApplicationDto {
  @IsNotEmpty()
  @IsInt()
  applicationId!: number;

  @IsOptional()
  @IsEnum(ApplicationStatusEnum)
  status?: ApplicationStatusEnum;

  // ---------- Relationships ---------- //
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateApplicationApplicantDto)
  applicant?: UpdateApplicationApplicantDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateApplicationEmployerListingDto)
  employerListing?: UpdateApplicationEmployerListingDto;
}
