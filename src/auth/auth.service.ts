import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TypeORMError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.login(email, password);
      const payload = { sub: user.id, email: user.email };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      if (err instanceof TypeORMError) {
        throw new UnauthorizedException();
      }

      throw err;
    }
  }
}
