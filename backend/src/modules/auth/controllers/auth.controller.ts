import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import {
  User,
  JwtUserPayload,
  RefreshJwtUserPayload,
} from '../../../common/decorators/user.decorator';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CookieEnum } from '../../../common/types/CookieEnum';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { User as UserEntity } from '../../../entities/user.entity';
import {
  COOKIE_MAX_AGE,
  setResponseCookiesTokens,
} from '../utils/setResponseCookiesTokens';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // -------------------- Routes -------------------- //
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(user);

    // attach access_token to cookie in the response headers SET-COOKIE
    setResponseCookiesTokens(res, tokens, COOKIE_MAX_AGE);

    return {
      [CookieEnum.access_token]: tokens.access_token,
      [CookieEnum.refresh_token]: tokens.refresh_token,
    };
  }

  // For manual refreshing of jwt tokens (e.g. via Bearer Token header)
  // (for cookies-based auth, JwtAuthGuard already enabled auto-refreshing of tokens if access_token has expired)
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @User() user: RefreshJwtUserPayload,
  ) {
    const tokens = await this.authService.refreshToken(
      user.userId,
      user.refreshToken,
    );

    // attach access_token and refresh_token to cookie in the response headers SET-COOKIE
    setResponseCookiesTokens(res, tokens, COOKIE_MAX_AGE);

    return {
      [CookieEnum.access_token]: tokens.access_token,
      [CookieEnum.refresh_token]: tokens.refresh_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @User() user: JwtUserPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    // remove cookie
    const tokens = {
      access_token: '',
      refresh_token: '',
    };
    setResponseCookiesTokens(res, tokens, 0);

    return await this.authService.logout(user.userId);
  }

  // Protecting Route with Jwt as Bearer Token
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: JwtUserPayload) {
    return user;
  }
}
