import { Module } from "@nestjs/common";
import { MembershipService } from "./membership.service";
import { MembersController } from "./members.controller";

@Module({
  controllers: [MembersController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
