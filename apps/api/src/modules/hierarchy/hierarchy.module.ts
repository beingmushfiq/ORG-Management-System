import { Module } from "@nestjs/common";
import { HierarchyService } from "./hierarchy.service";
import { BranchesController } from "./branches.controller";

@Module({
  controllers: [BranchesController],
  providers: [HierarchyService],
  exports: [HierarchyService],
})
export class HierarchyModule {}
