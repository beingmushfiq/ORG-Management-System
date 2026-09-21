import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class VerifyOtpDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  phoneOrEmail?: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code!: string;

  @IsOptional()
  @IsString()
  organizationSlug?: string;
}
