import { Module } from '@nestjs/common';
import { ProjectAuthorisationsService } from './project_authorisations.service';
import { ProjectAuthorisationsController } from './project_authorisations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProjectAuthorisationsService, PrismaService],
  controllers: [ProjectAuthorisationsController]
})
export class ProjectAuthorisationsModule {}
