import { Response } from 'express';
import { CookieEnum } from '../../../common/types/CookieEnum';

export const COOKIE_MAX_AGE = 1210000; // 2 weeks

export const setResponseCookiesTokens = (
  res: Response,
  tokens: {
    access_token: string;
    refresh_token: string;
  },
  maxAge: number,
) => {
  res.cookie(CookieEnum.access_token, tokens.access_token, {
    maxAge: maxAge,
    httpOnly: true,
  });
  res.cookie(CookieEnum.refresh_token, tokens.refresh_token, {
    maxAge: maxAge,
    httpOnly: true,
  });
};
