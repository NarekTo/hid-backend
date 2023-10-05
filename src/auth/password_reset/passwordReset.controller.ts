import { Controller, Post, Body, Get, Param, Query, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { PrismaService } from '../../prisma/prisma.service'
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('password-reset')
@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService,  private prismaService: PrismaService) {}

  @Post('create')
  async createPasswordReset(@Body('email') email: string, @Body('userId') userId: string) {
    const token = await this.passwordResetService.createPasswordReset(email, userId);

   
    const passwordReset = { token };
    // Send email
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      secure: false, // use `secure` instead of `secureConnection`
      port: 587,
      auth: {
        user: process.env.EMAIL, // your email address
        pass: process.env.PASSWORD, 
      },
      tls: {
        ciphers:'SSLv3'
      }
    });

    let mailOptions = {
      from: 'serenaolivieri@hotmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3001/reset-password?token=${passwordReset.token}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return passwordReset;
  }

  @Post('validate')
  async validatePasswordReset(@Body('user_id') user_id: string, @Body('token') token: string) { // use user_id instead of email
    return this.passwordResetService.validatePasswordReset(user_id, token);
  }

  @Post('reset')
  async resetPassword(
    @Body('user_id') user_id: string,
    @Body('newPassword') newPassword: string,
    @Query('token') token: string
  ) {
    // Validate the token
    const passwordReset = await this.passwordResetService.validatePasswordReset(user_id, token);
  
    // If the token is valid, reset the password
    if (passwordReset) {
      // Fetch the user with the given user_id
      const user = await this.prismaService.admin_users.findUnique({
        where: { user_id },
      });
  
      // If no user is found, throw an error
      if (!user) {
        throw new NotFoundException(`No user found for user_id: ${user_id}`);
      }
  
      // Hash the new password
      const hashedPassword = crypto.createHash('sha1').update(newPassword).digest('hex').substring(0, 20); // assuming app_password column length is 20
      // Update the user's password in the database
      await this.prismaService.admin_users.update({
        where: { user_id },
        data: { app_password: hashedPassword },
      });
  
      // Return a success message
      return { message: 'Password reset successful' };
    }
  
    // If the token is not valid, throw an error
    throw new UnauthorizedException('Invalid password reset token');
  }
}