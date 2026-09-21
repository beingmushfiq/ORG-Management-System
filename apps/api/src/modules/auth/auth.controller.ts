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
  BadRequestException,
} from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { SendOtpDto } from "./dto/send-otp.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { LoginDto } from "./dto/login.dto";
import { SwitchPositionDto } from "./dto/switch-position.dto";
import { Public } from "../../common/decorators/public.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Public()
  @Post(["send-otp", "otp/send"])
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto) {
    const phone = dto.phone || dto.phoneOrEmail;
    if (!phone) {
      throw new BadRequestException("Phone number is required.");
    }
    const slug = dto.organizationSlug || "rsm-bd";
    return this.authService.sendSmsOtp(slug, phone);
  }

  @Public()
  @Post(["verify-otp", "otp/verify"])
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const phone = dto.phone || dto.phoneOrEmail;
    if (!phone) {
      throw new BadRequestException("Phone number is required.");
    }
    const slug = dto.organizationSlug || "rsm-bd";
    return this.authService.verifySmsOtp(
      slug,
      phone,
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
    const email = dto.email || dto.phoneOrEmail;
    if (!email) {
      throw new BadRequestException("Email or phone is required.");
    }
    const slug = dto.organizationSlug || "rsm-bd";
    return this.authService.loginWithPassword(
      slug,
      email,
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
    const targetId = dto.targetPositionId || dto.userPositionId;
    if (!targetId) {
      throw new BadRequestException("Target position ID is required.");
    }
    return this.authService.switchActivePosition(
      user.id,
      user.organizationId,
      targetId,
      res
    );
  }

  @Public()
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    let user = (req as any).user;
    if (!user) {
      const token =
        (req as any).cookies?.["access_token"] ||
        (req.headers["authorization"]?.startsWith("Bearer ")
          ? req.headers["authorization"].split(" ")[1]
          : null);
      if (token) {
        try {
          user = this.jwtService.decode(token);
        } catch {
          // Ignored if malformed
        }
      }
    }
    return this.authService.logout(
      user?.sub || user?.id,
      user?.organizationId,
      user?.sessionId,
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
