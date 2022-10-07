import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeORMError } from 'typeorm';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (e) {
      if (e instanceof TypeORMError) {
        throw new ConflictException();
      }

      throw e;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }
}
