import { IsOptional, IsString } from "class-validator";

export class SendOtpDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  phoneOrEmail?: string;

  @IsOptional()
  @IsString()
  organizationSlug?: string;
}
