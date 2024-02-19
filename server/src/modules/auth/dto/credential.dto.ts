import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/utils/constants';

export class CredentialSigninDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CredentialSignupDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/, {
    message:
      'Username must start with alphabet, at least 4 characters and maximum 30 characters',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 upper case letter, at least 1 lower case letter and at least 1 number or special character.',
  })
  password: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
