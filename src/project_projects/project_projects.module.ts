import { Module } from '@nestjs/common';
import { ProjectProjectsController } from './project_projects.controller';
import { ProjectProjectsService } from './project_projects.service';

@Module({
  controllers: [ProjectProjectsController],
  providers: [ProjectProjectsService],
})
export class ProjectProjectsModule {}