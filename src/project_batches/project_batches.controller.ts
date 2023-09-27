import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { ProjectBatchesService } from './project_batches.service';
import { project_batches, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('project_batches')
@Controller('project-batches')
export class ProjectBatchesController {
  constructor(private projectBatchesService: ProjectBatchesService) {}

  @Get() // No parameters in the route path
  @ApiBearerAuth()
  findAllBatches(): Promise<project_batches[]> {
    return this.projectBatchesService.findAllBatches();
  }

  @Get(':jobId/:batchNumber')
  @ApiBearerAuth()
  findBatch(
    @Param('jobId') jobId: string,
    @Param('batchNumber') batchNumber: string,
  ): Promise<project_batches | null> {
    return this.projectBatchesService.findBatch(jobId, batchNumber);
  }

  @Post()
  @ApiBearerAuth()
  createBatch(
    @Body() data: Prisma.project_batchesCreateInput,
  ): Promise<project_batches> {
    return this.projectBatchesService.createBatch(data);
  }

  @Put(':jobId/:batchNumber') // Add 'jobId' parameter to the route
  @ApiBearerAuth()
  updateBatch(
    @Param('jobId') jobId: string, // Add 'jobId' parameter here
    @Param('batchNumber') batchNumber: string,
    @Body() data: Prisma.project_batchesUpdateInput,
  ): Promise<project_batches> {
    return this.projectBatchesService.updateBatch({ jobId, batchNumber, data }); // Pass 'jobId' here
  }

  @Delete(':jobId/:batchNumber') // Add 'jobId' parameter to the route
  @ApiBearerAuth()
  deleteBatch(
    @Param('jobId') jobId: string, // Add 'jobId' parameter here
    @Param('batchNumber') batchNumber: string,
  ): Promise<project_batches> {
    return this.projectBatchesService.deleteBatch(jobId, batchNumber); // Pass 'jobId' here
  }
}
