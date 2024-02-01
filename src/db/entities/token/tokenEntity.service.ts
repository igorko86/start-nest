import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@db/entities/user/user.entity';

import { Token } from './token.entity';

@Injectable()
export class TokenEntityService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async saveRefreshToken(refreshToken: string, user: User) {
    const token = await this.tokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (token) {
      token.refreshToken = refreshToken;

      return Token.save(token);
    }
    const newToken = Token.create({
      refreshToken,
      user,
    });

    return newToken.save();
  }

  async removeToken(refreshToken: string) {
    await Token.delete({ refreshToken });
  }
}
