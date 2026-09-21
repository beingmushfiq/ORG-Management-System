import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { SendOtpDto } from "./dto/send-otp.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { LoginDto } from "./dto/login.dto";
import { SwitchPositionDto } from "./dto/switch-position.dto";
import { Public } from "../../common/decorators/public.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("otp/send")
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendSmsOtp(dto.organizationSlug, dto.phone);
  }

  @Public()
  @Post("otp/verify")
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.verifySmsOtp(
      dto.organizationSlug,
      dto.phone,
      dto.code,
      res
    );
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginWithPassword(
      dto.organizationSlug,
      dto.email,
      dto.password,
      res
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("switch-position")
  @HttpCode(HttpStatus.OK)
  async switchPosition(
    @Req() req: Request,
    @Body() dto: SwitchPositionDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = (req as any).user;
    return this.authService.switchActivePosition(
      user.id,
      user.organizationId,
      dto.targetPositionId,
      res
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = (req as any).user;
    return this.authService.logout(
      user.id,
      user.organizationId,
      user.sessionId,
      res
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getProfile(@Req() req: Request) {
    const user = (req as any).user;
    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        fullNameBn: user.fullNameBn,
        organizationId: user.organizationId,
        membership: user.membership,
        activePositionId: user.activePositionId,
        positions: user.positions,
      },
    };
  }
}
