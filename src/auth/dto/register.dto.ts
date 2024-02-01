import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserType } from '@db/entities/user/types';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/, {
    message: 'Password to Weak',
  })
  readonly password: string;
  @IsEnum(UserType)
  readonly type: UserType;
}
