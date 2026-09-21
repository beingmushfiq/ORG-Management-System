import { IsOptional, IsString } from "class-validator";

export class SwitchPositionDto {
  @IsOptional()
  @IsString()
  targetPositionId?: string;

  @IsOptional()
  @IsString()
  userPositionId?: string;
}
