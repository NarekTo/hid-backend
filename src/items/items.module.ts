import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsGateway } from 'src/gateways/items.gateway';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService, ItemsGateway],
})
export class ItemsModule {}