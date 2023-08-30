import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const { username, password } = body;
      const user = await this.adminUsersService.getUserByUsernameAndPassword(
        username,
        password,
      );

      if (!user) {
        throw new NotAcceptableException('could not find the user');
      }

      // Perform any additional checks or token generation here

      return user;
    } catch (error) {
      throw new HttpException(
        'Authentication failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
