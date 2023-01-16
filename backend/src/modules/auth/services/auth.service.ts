import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import {
  hashJwtRefreshToken,
  validateJwtRefreshTokenHash,
  validatePasswordHash,
} from '../../../common/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../entities/';
import { ConfigService } from '@nestjs/config';
import { JwtUserPayload } from '../../../common/decorators/user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // -------------------- User Validation -------------------- //
  // validate user (used in local.strategy.ts)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneByEmail(email);
    if (user && validatePasswordHash(password, user.passwordHash)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  // -------------------- API endpoint functions -------------------- //
  // generating and returning a JWT (Json Web Token)
  async login(user: any) {
    const userEntity = user as User;
    const payload = this.getPayload(userEntity);
    const tokens = await this.getTokens(payload);

    // save refresh token in 'User' table
    await this.usersService.updateOne({
      userId: userEntity.userId,
      refreshToken: hashJwtRefreshToken(tokens.refresh_token),
    });

    return tokens;
  }

  async logout(userId: number) {
    // remove refresh token from 'User' table
    return this.usersService.updateOne({ userId: userId, refreshToken: null });
  }

  async refreshToken(userId: number, refresh_token: string) {
    const user = await this.usersService.getOneById(userId);

    // validate refresh_token
    if (!user || !user.refreshToken) throw new UnauthorizedException();
    if (!validateJwtRefreshTokenHash(refresh_token, user.refreshToken)) {
      await this.usersService.updateOne({ userId: userId, refreshToken: null });
      throw new UnauthorizedException();
    }

    // generate new pairs of tokens
    const payload = this.getPayload(user);
    const tokens = await this.getTokens(payload);

    // save refresh token in 'User' table
    await this.usersService.updateOne({
      userId: userId,
      refreshToken: hashJwtRefreshToken(tokens.refresh_token),
    });

    return tokens;
  }

  // -------------------- Helper functions -------------------- //
  private async getTokens(payload: any) {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '14d',
    });

    return { access_token, refresh_token };
  }

  // Destructing User to return only the required information
  private getPayload(user: User) {
    const payloadUser: JwtUserPayload['user'] = {
      userId: user.userId,
      applicant: {
        applicantId: user.applicant?.applicantId,
      },
      employer: {
        employerId: user.employer?.employerId,
      },
    };
    return { user: payloadUser, sub: payloadUser.userId }; // Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
  }
}
