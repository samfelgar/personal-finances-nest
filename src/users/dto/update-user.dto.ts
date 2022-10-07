import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  username?: string;

  firstName?: string;
  lastName?: string;

  password?: string;

  @IsEmail()
  email?: string;
}
