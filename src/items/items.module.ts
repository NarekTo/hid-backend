import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsGateway } from 'src/gateways/items.gateway';
import { ProjectBatchesService } from 'src/project_batches/project_batches.service';
import { ProjectProjectsService } from 'src/project_projects/project_projects.service';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    PrismaService,
    ItemsGateway,
    ProjectBatchesService,
    ProjectProjectsService,
  ],
})
export class ItemsModule {}
