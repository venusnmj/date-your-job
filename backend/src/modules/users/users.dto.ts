import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// -------------------- CRUD DTO -------------------- //
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEmpty()
  passwordHash?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
