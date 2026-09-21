import { IsNotEmpty, IsString } from "class-validator";

export class SwitchPositionDto {
  @IsNotEmpty()
  @IsString()
  targetPositionId!: string;
}
