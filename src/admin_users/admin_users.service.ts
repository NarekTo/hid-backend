import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByUsernameAndPassword(username: string, password: string) {
    return this.prisma.admin_users.findFirst({
      where: {
        username,
        app_password: password,
      },
      select: {
        user_id: true,
        username: true,
        app_privileges: true,
      },
    });
  }
}
