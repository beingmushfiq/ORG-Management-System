import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMemberApplicationDto {
  @IsNotEmpty()
  @IsString()
  organizationSlug!: string;

  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  fullNameBn?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  bmdcRegNo?: string;

  @IsOptional()
  @IsString()
  nidNumber?: string;

  @IsOptional()
  @IsString()
  branchNodeId?: string;
}
