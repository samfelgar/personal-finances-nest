import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ email });

    const passwordMatches = await argon.verify(user.password, password);

    if (!passwordMatches) {
      throw new Error('Invalid password');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneByOrFail({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await this.hashPassword(createUserDto.password);
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;

    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id });

    for (const property in updateUserDto) {
      const propertyValue: any = updateUserDto[property];

      if (!updateUserDto[property]) {
        continue;
      }

      const isPassword = property === 'password';
      user[property] = isPassword
        ? await this.hashPassword(propertyValue)
        : propertyValue;
    }

    return await this.usersRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon.hash(password);
  }
}
