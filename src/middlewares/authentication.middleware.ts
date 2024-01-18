import { Request, Response } from 'express';
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

import { UNAUTHORIZED } from '@common/constants/error.constants';
import { TokenService } from '@common/token/token.service';

import { RequestService } from '../request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    readonly tokenService: TokenService,
    readonly requestService: RequestService,
  ) {}
  use(req: Request, res: Response, next: (error?: any) => void) {
    const barerToken = req.headers.authorization;

    if (!barerToken || !req.cookies.refreshToken) {
      throw new ForbiddenException(UNAUTHORIZED);
    }
    const [, accessToken] = barerToken.split(' ');

    if (!accessToken) {
      throw new ForbiddenException(UNAUTHORIZED);
    }

    const userData = this.tokenService.validateToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as unknown as string,
    );

    if (!userData) {
      throw new ForbiddenException(UNAUTHORIZED);
    }
    this.requestService.userId = userData.id;

    next();
  }
}
