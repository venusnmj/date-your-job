import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class JwtUserPayload {
  userId: number;
  user: {
    userId: number;
    applicant: {
      applicantId: number;
    };
    employer: {
      employerId: number;
    };
  };
}

export class RefreshJwtUserPayload extends JwtUserPayload {
  refreshToken: string;
}

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // return a property if given in the decorator, else return user
    return data ? user?.[data] : user;
  },
);
