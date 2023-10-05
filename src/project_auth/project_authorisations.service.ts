import { Injectable } from '@nestjs/common';
import { project_authorisations } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectAuthorisationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<project_authorisations[]> {
    return this.prisma.project_authorisations.findMany();
  }

  async findById(jobId: number, userId: string): Promise<project_authorisations | null> {
    return this.prisma.project_authorisations.findUnique({
      where: { job_id_user_id: { job_id: jobId, user_id: userId } },
    });
  }

  async create(data: project_authorisations): Promise<project_authorisations> {
    return this.prisma.project_authorisations.create({ data });
  }

  async update(jobId: number, userId: string, data: Partial<project_authorisations>): Promise<project_authorisations | null> {
    return this.prisma.project_authorisations.update({
      where: { job_id_user_id: { job_id: jobId, user_id: userId } },
      data,
    });
  }

  async delete(jobId: number, userId: string): Promise<project_authorisations | null> {
    return this.prisma.project_authorisations.delete({
      where: { job_id_user_id: { job_id: jobId, user_id: userId } },
    });
  }
}