import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtUserPayload } from '../../../common/decorators/user.decorator';
import { CookieEnum } from '../../../common/types/CookieEnum';
import { AuthService } from '../services/auth.service';
import {
  COOKIE_MAX_AGE,
  setResponseCookiesTokens,
} from '../utils/setResponseCookiesTokens';
import { updateRequestCookiesTokens } from '../utils/updateRequestCookiesTokens';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }
  // Custom Cookie-based Auth logic to refresh access_token and refresh_token if access_token is invalid and refresh_token is valid
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    // if no cookies present
    if (!req.cookies) return (await super.canActivate(context)) as boolean;

    const access_token = req.cookies[CookieEnum.access_token];
    const refresh_token = req.cookies[CookieEnum.refresh_token];

    const jwtService = new JwtService();
    const configService = new ConfigService();

    try {
      // verify if access token is valid and not expired - will throw error if invalid or expired
      jwtService.verify(access_token, {
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        ignoreExpiration: false,
      });
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        // Access token has expired
        try {
          // verify if refresh token is valid and not expired - will throw error if invalid or expired
          jwtService.verify(refresh_token, {
            secret: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            ignoreExpiration: false,
          });

          // Refresh token is valid
          const payload = jwtService.decode(access_token) as JwtUserPayload;
          const userId = payload.user.userId; // note: payload.userId is undefined

          // refresh both tokens
          const tokens = await this.authService.refreshToken(
            userId,
            refresh_token,
          );

          // update request cookies to continue request
          updateRequestCookiesTokens(req, tokens);
          // set response cookies to give back to the client
          setResponseCookiesTokens(res, tokens, COOKIE_MAX_AGE);
        } catch {
          // Error: invalid access_token and refresh_token
          // clear jwt access_token and refresh_token cookies in the client
          const tokens = { access_token: '', refresh_token: '' };
          setResponseCookiesTokens(res, tokens, 0);
        }
      }
    }

    return (await super.canActivate(context)) as boolean;
  }
}
