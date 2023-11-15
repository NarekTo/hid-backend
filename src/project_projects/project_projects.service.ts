import { Injectable } from '@nestjs/common';
import { project_projects } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(
    projectData: project_projects,
  ): Promise<project_projects> {
    return this.prisma.project_projects.create({
      data: projectData,
    });
  }

  async findProjectById(id: number): Promise<project_projects | null> {
    return this.prisma.project_projects.findUnique({
      where: {
        job_id: id,
      },
    });
  }

  async findAllProjects(): Promise<project_projects[]> {
    return this.prisma.project_projects.findMany();
  }

  async updateProject(
    id: number,
    projectData: project_projects,
  ): Promise<project_projects | null> {
    return this.prisma.project_projects.update({
      where: { job_id: id },
      data: projectData,
    });
  }

  async deleteProject(id: number): Promise<project_projects | null> {
    return this.prisma.project_projects.delete({
      where: { job_id: id },
    });
  }

  async getUserProjects(
    userId: string,
  ): Promise<{
    userProjects: project_projects[];
    projects: project_projects[];
  }> {
    const projectAuthorisations =
      await this.prisma.project_authorisations.findMany({
        where: {
          user_id: userId,
        },
        select: {
          job_id: true,
        },
      });

    const jobIds = projectAuthorisations.map(
      (projectAuth) => projectAuth.job_id,
    );

    const userProjects = await this.prisma.project_projects.findMany({
      where: {
        job_id: {
          in: jobIds,
        },
      },
    });
    const projects = await this.prisma.project_projects.findMany();

    return { userProjects, projects };
  }
}
