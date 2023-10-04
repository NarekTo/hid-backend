import { Module } from '@nestjs/common';
import { ProjectProjectsController } from './project_projects.controller';
import { ProjectProjectsService } from './project_projects.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({


  controllers: [ProjectProjectsController],
  providers: [ProjectProjectsService, PrismaService],
})
export class ProjectProjectsModule {}