import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request as RequestType } from 'express';
import { CookieEnum } from '../../../common/types/CookieEnum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Attempt 1 - Extract Jwt from cookies
        JwtStrategy.extractJwtAccessTokenFromCookies,
        // Attempt 2 - Extract Jwt from headers
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  // Custom function to extract Jwt access_token from cookies
  private static extractJwtAccessTokenFromCookies(
    req: RequestType,
  ): string | null {
    if (
      req.cookies &&
      CookieEnum.access_token in req.cookies &&
      req.cookies[CookieEnum.access_token].length > 0
    ) {
      return req.cookies[CookieEnum.access_token];
    }
    // access_token not present in cookie
    return null;
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      user: payload.user,
    };
  }
}
