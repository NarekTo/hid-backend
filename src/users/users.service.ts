// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.admin_users.create({
      data: {
        user_id: '1', // You should generate a user_id here
        username: createUserDto.username,
        employment_status: 'Active', // Assuming a default value
        app_password: hashedPassword,
        email: createUserDto.email,
        // You can set other properties here
      },
    });
  }

  findAll() {
    return this.prisma.admin_users.findMany();
  }

  findOne(user_id: string) {
    return this.prisma.admin_users.findUnique({ where: { user_id } });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.admin_users.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  remove(user_id: string) {
    return this.prisma.admin_users.delete({ where: { user_id } });
  }
}
