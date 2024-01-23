import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UserType } from '@entities/user/types';

import { RegisterDto } from '../../auth/dto/register.dto';

type TJwtPayload = JwtPayload & { id: string };
@Injectable()
export class TokenService {
  hashData(payload: string | Buffer | object, secretKey: string) {
    try {
      return jwt.sign(payload, secretKey);
    } catch {}
  }
  validateToken(token: string, secretKey: string) {
    try {
      return <TJwtPayload>jwt.verify(token, secretKey);
    } catch {}
  }

  generateTokens(
    payload: Omit<RegisterDto, 'password'> & { type: UserType; id: string },
  ): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      },
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
