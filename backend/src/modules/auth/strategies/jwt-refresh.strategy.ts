import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { CookieEnum } from '../../../common/types/CookieEnum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Attempt 1 - Extract Jwt from cookies
        JwtRefreshStrategy.extractJwtRefreshTokenFromCookies,
        // Attempt 2 - Extract Jwt from headers
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  // Custom function to extract Jwt refresh_token from cookies
  private static extractJwtRefreshTokenFromCookies(
    req: RequestType,
  ): string | null {
    if (
      req.cookies &&
      CookieEnum.refresh_token in req.cookies &&
      req.cookies[CookieEnum.refresh_token].length > 0
    ) {
      return req.cookies[CookieEnum.refresh_token];
    }
    // refresh_token not present in cookie
    return null;
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.cookies[CookieEnum.refresh_token];

    return {
      userId: payload.sub,
      user: payload.user,
      refreshToken: refreshToken,
    };
  }
}
