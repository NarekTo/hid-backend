import { Injectable } from '@nestjs/common';

import { project_batches, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectBatchesService {
  constructor(private prisma: PrismaService) {}

  async findAllBatches(): Promise<project_batches[]> {
    console.log('from service', this.prisma.project_batches.findMany());
    return this.prisma.project_batches.findMany(); // Retrieve all batches
  }

  async findBatch(
    job_id: string,
    batchNumber: string,
  ): Promise<project_batches | null> {
    return this.prisma.project_batches.findUnique({
      where: { job_id_batch_number: { job_id, batch_number: batchNumber } },
    });
  }

  async createBatch(
    data: Prisma.project_batchesCreateInput,
  ): Promise<project_batches> {
    return this.prisma.project_batches.create({
      data,
    });
  }

  async updateBatch(params: {
    jobId: string; // Assuming jobId is required for unique identification
    batchNumber: string;
    data: Prisma.project_batchesUpdateInput;
  }): Promise<project_batches> {
    const { jobId, batchNumber, data } = params;
    return this.prisma.project_batches.update({
      data,
      where: {
        job_id_batch_number: { job_id: jobId, batch_number: batchNumber },
      },
    });
  }

  async deleteBatch(
    jobId: string,
    batchNumber: string,
  ): Promise<project_batches> {
    return this.prisma.project_batches.delete({
      where: {
        job_id_batch_number: { job_id: jobId, batch_number: batchNumber },
      },
    });
  }
}
