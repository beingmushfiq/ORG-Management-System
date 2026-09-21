import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { MembershipModule } from "../membership/membership.module";

@Module({
  imports: [MembershipModule],
  controllers: [PublicController],
})
export class PublicModule {}
