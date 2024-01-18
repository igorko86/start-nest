import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RegisterDto } from '../../auth/register.dto';

import { User } from './user.entity';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneUser(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(data: RegisterDto) {
    const newUser = this.userRepository.create(data);

    return await this.userRepository.save(newUser);
  }

  async updateUser({
    data,
    user,
    id,
  }: {
    data: { isActive: boolean };
    user?: User;
    id?: string;
  }) {
    let currentUser = user;

    if (!currentUser && id) {
      currentUser = await this.findOneUser(id);
    }

    if (!currentUser && !id) {
      // throw new Error('Either user or id must be provided.'); // TODO add error handler
    }
    currentUser = Object.assign(currentUser, data);

    await currentUser.save();
  }
}
