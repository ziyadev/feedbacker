import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class LoginUserWithProviderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  emailVerified: boolean;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  provider: string;

  @IsNotEmpty()
  providerAccountId: string;
}
