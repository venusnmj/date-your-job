import { Request } from 'express';
import { CookieEnum } from '../../../common/types/CookieEnum';

export const updateRequestCookiesTokens = (
  req: Request,
  tokens: {
    access_token: string;
    refresh_token: string;
  },
) => {
  req.cookies[CookieEnum.access_token] = tokens.access_token;
  req.cookies[CookieEnum.refresh_token] = tokens.refresh_token;
};
