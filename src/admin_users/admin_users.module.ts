import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminUsersController } from './admin_users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AdminUsersService, PrismaService],
  controllers: [AdminUsersController],
})
export class AdminUsersModule {}
