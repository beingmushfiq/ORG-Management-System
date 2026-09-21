import { Module } from "@nestjs/common";
import { GovernanceService } from "./governance.service";
import { GovernanceController } from "./governance.controller";
import { MinutesGeneratorService } from "./minutes-generator.service";

@Module({
  controllers: [GovernanceController],
  providers: [GovernanceService, MinutesGeneratorService],
  exports: [GovernanceService, MinutesGeneratorService],
})
export class GovernanceModule {}
