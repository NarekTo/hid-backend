import { Module } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { PasswordResetController } from './passwordReset.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule], // Add PrismaModule to the imports array
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}