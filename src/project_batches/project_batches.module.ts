import { Module } from '@nestjs/common';
import { ProjectBatchesController } from './project_batches.controller';

import { ProjectBatchesService } from './project_batches.service';
import { PrismaService } from 'src/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [ProjectBatchesService, PrismaService],
  controllers: [ProjectBatchesController],
})
export class ProjectBatchesModule {}
