import { Controller, Get, Post, Put, Delete, Body, Param,   UseGuards } from '@nestjs/common';
import { ProjectProjectsService } from './project_projects.service';
import { project_projects } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('project_projects')
@Controller('projects')
export class ProjectProjectsController {
  constructor(private readonly projectProjectsService: ProjectProjectsService) {}

  @Post()
  @ApiBearerAuth()
  async createProject(@Body() projectData: project_projects): Promise<project_projects> {
    return this.projectProjectsService.createProject(projectData);
  }

  @Get(':id')
  @ApiBearerAuth()
  async findProjectById(@Param('id') id: number): Promise<project_projects | null> {
    return this.projectProjectsService.findProjectById(id);
  }

  @Get()
  @ApiBearerAuth()
  async findAllProjects(): Promise<project_projects[]> {
    return this.projectProjectsService.findAllProjects();
  }

  @Put(':id')
  @ApiBearerAuth()
  async updateProject(@Param('id') id: number, @Body() projectData: project_projects): Promise<project_projects | null> {
    return this.projectProjectsService.updateProject(id, projectData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async deleteProject(@Param('id') id: number): Promise<project_projects | null> {
    return this.projectProjectsService.deleteProject(id);
  }
}