import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

import {
  ACTIVATE_ERROR,
  ACTIVATION_LINK_ERROR,
  EMAIL_EXISTS,
  LOGIN_ERROR,
} from '@common/constants/error.constants';
import { MailService } from '@common/mail/mail.service';
import { TokenService } from '@common/token/token.service';
import { TokenEntityService } from '@entities/token/tokenEntity.service';
import { UserEntityService } from '@entities/user/userEntity.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userEntityService: UserEntityService,
    private readonly tokenEntityService: TokenEntityService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}
  async register(data: RegisterDto) {
    const user = await this.userEntityService.findOneByEmail(data.email);

    if (user) {
      throw new BadRequestException(EMAIL_EXISTS);
    }

    const hashPassword = bcrypt.hashSync(String(data.password), 10);
    const newUser = await this.userEntityService.createUser({
      ...data,
      password: hashPassword,
    });

    const hashUserId = this.tokenService.hashData(
      { id: newUser.id },
      'user-id',
    );

    const link = `${process.env.CLIENT_URL}/sign-up/activate/${hashUserId}`;
    // const html = registerMailHtml({ link }); // TODO ADD email template
    //
    await this.mailService.sendActivationMail(data.email, link);
  }

  async activate(id: string) {
    const user = await this.userEntityService.findOneUser(id);

    if (!user || user.isActive) {
      throw new BadRequestException(ACTIVATION_LINK_ERROR);
    }

    await this.userEntityService.updateUser({
      data: {
        isActive: true,
      },
      user,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userEntityService.findOneByEmail(email);
    //
    if (!user) {
      throw new BadRequestException(LOGIN_ERROR);
    } else if (!user.isActive) {
      throw new BadRequestException(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(
      String(password),
      String(user.password),
    );

    if (!isPassEquals) {
      throw new BadRequestException(LOGIN_ERROR);
    }

    const tokens = this.tokenService.generateTokens({
      name: user.name,
      email: user.email,
      type: user.type,
      id: user.id,
    });

    await this.tokenEntityService.saveRefreshToken(tokens.refreshToken, user);

    return tokens;
  }
  async logout(refreshToken: string) {
    await this.tokenEntityService.removeToken(refreshToken);
  }
}
