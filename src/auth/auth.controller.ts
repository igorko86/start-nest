import { Request, Response } from 'express';
import * as uuid from 'uuid';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { SOMETHING_WENT_WRONG } from '@common/constants/error.constants';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('registration')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    await this.authService.register(registerDto);

    return res.send({ status: 'ok' });
  }

  @Post('activate')
  async activate(@Body('activateId') id: string, @Res() res: Response) {
    if (!id || !uuid.validate(id)) {
      throw new BadRequestException(SOMETHING_WENT_WRONG);
    }
    await this.authService.activate(id);

    return res.send({ status: 'ok' });
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(body);
    this.setCookie(refreshToken, res);

    return res.send(accessToken);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.cookies.refreshToken);
    res.clearCookie('refreshToken');

    return res.send({ status: 'ok' });
  }

  private setCookie(value: string, res: Response) {
    res.cookie('refreshToken', value, {
      maxAge: process.env.COOKIE_EXPIRES as unknown as number,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
}
