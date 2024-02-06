import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, PrismaService],
})
export class CurrenciesModule {}
