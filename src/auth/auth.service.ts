//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './auth.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(user_id: string, password: string): Promise<AuthEntity> {
   try{
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.admin_users.findUnique({
      where: { user_id },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for user id: ${user_id}`);
    }
    // const isPasswordValid = await bcrypt.compare(password, user.app_password);

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex').substring(0, 20);

  // Compare the hashed password with the stored password
  const isPasswordValid = user.app_password === hashedPassword;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.jwtService.sign({ user_id });

    const authEntity: AuthEntity = {
      user_id: user.user_id,
      name: user.username,
      email: user.email,
      job_title_code: user.job_title_code,
      app_password: user.app_password,
      app_privileges: user.app_privileges,
      department_code: user.department_code,
      accessToken,
    };

    // Step 3: Generate a JWT containing the user's ID and return it
    return authEntity;
  } catch (err){
    console.error(err);

    // Throw a generic error message
    throw new Error('An error occurred while trying to log in');
  }
  }
}
