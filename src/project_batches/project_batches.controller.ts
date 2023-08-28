import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectBatchesService } from './project_batches.service';
import { project_batches, Prisma } from '@prisma/client';

@Controller('project-batches')
export class ProjectBatchesController {
  constructor(private projectBatchesService: ProjectBatchesService) {}

  @Get() // No parameters in the route path
  findAllBatches(): Promise<project_batches[]> {
    return this.projectBatchesService.findAllBatches();
  }

  @Get(':jobId/:batchNumber')
  findBatch(
    @Param('jobId') jobId: string,
    @Param('batchNumber') batchNumber: string,
  ): Promise<project_batches | null> {
    return this.projectBatchesService.findBatch(jobId, batchNumber);
  }

  @Post()
  createBatch(
    @Body() data: Prisma.project_batchesCreateInput,
  ): Promise<project_batches> {
    return this.projectBatchesService.createBatch(data);
  }

  @Put(':jobId/:batchNumber') // Add 'jobId' parameter to the route
  updateBatch(
    @Param('jobId') jobId: string, // Add 'jobId' parameter here
    @Param('batchNumber') batchNumber: string,
    @Body() data: Prisma.project_batchesUpdateInput,
  ): Promise<project_batches> {
    return this.projectBatchesService.updateBatch({ jobId, batchNumber, data }); // Pass 'jobId' here
  }

  @Delete(':jobId/:batchNumber') // Add 'jobId' parameter to the route
  deleteBatch(
    @Param('jobId') jobId: string, // Add 'jobId' parameter here
    @Param('batchNumber') batchNumber: string,
  ): Promise<project_batches> {
    return this.projectBatchesService.deleteBatch(jobId, batchNumber); // Pass 'jobId' here
  }
}
