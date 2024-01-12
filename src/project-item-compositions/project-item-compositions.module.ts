import { Module } from '@nestjs/common';
import { ProjectItemCompositionsService } from './project-item-compositions.service';
import { ProjectItemCompositionsController } from './project-item-compositions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [CacheModule.register(), PrismaModule],
  providers: [ProjectItemCompositionsService, PrismaService],
  controllers: [ProjectItemCompositionsController],
})
export class ProjectItemCompositionsModule {}
