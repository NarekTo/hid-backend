import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { project_authorisations } from '@prisma/client';
import { ProjectAuthorisationsService } from './project_authorisations.service';

@ApiTags('project_authorisations')
@ApiBearerAuth()
@Controller('project-authorisations')
export class ProjectAuthorisationsController {
  constructor(private projectAuthorisationsService: ProjectAuthorisationsService) {}

  @Get()
  findAll(): Promise<project_authorisations[]> {
    return this.projectAuthorisationsService.findAll();
  }

  @Get(':jobId/:userId')
  findById(@Param('jobId') jobId: number, @Param('userId') userId: string): Promise<project_authorisations | null> {
    return this.projectAuthorisationsService.findById(jobId, userId);
  }

  @Post()
  create(@Body() data: project_authorisations): Promise<project_authorisations> {
    return this.projectAuthorisationsService.create(data);
  }

  @Put(':jobId/:userId')
  update(
    @Param('jobId') jobId: number,
    @Param('userId') userId: string,
    @Body() data: Partial<project_authorisations>,
  ): Promise<project_authorisations | null> {
    return this.projectAuthorisationsService.update(jobId, userId, data);
  }

  @Delete(':jobId/:userId')
  delete(@Param('jobId') jobId: number, @Param('userId') userId: string): Promise<project_authorisations | null> {
    return this.projectAuthorisationsService.delete(jobId, userId);
  }
}