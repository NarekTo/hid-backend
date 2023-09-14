import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PasswordResetService {
  constructor(private prismaService: PrismaService) {}
  
  calculateExpiryDate() {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);
    return expiryDate;
  }

  async createPasswordReset(email: string, userId: string) {
    const token = this.generateToken(); // Implement this function
    const expiryDate = this.calculateExpiryDate(); // Implement this function
  
    const passwordReset = await this.prismaService.passwordReset.create({
      data: {
        email,
        user_id: userId,
        token,
        expiryDate,
      },
    });
  
    return token;
  }

  async validatePasswordReset(user_id: string, token: string) {
    // Check if the token exists in the database for the given user_id
// Check if the token exists in the database for the given user_id
const passwordReset = await this.prismaService.passwordReset.findFirst({
    where: { user_id: user_id, token: token },});

    // If the token exists and matches the provided token, return true
    if (passwordReset && passwordReset.token === token) {
      return true;
    }

    // If the token does not exist or does not match, return false
    return false;
  }

  generateToken() {
    // Generate a random token
    return Math.random().toString(36).substr(2);
  }
}