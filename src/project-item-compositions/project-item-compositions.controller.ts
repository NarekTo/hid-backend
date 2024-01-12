import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectItemCompositionsService } from './project-item-compositions.service';
import { project_item_compositions } from '@prisma/client';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('project_item_compositions')
@Controller('project_item_compositions')
export class ProjectItemCompositionsController {
  constructor(
    private readonly compositionsService: ProjectItemCompositionsService,
  ) {}

  @Get()
  @ApiBearerAuth()
  async getAllItemCompositions(): Promise<project_item_compositions[]> {
    return this.compositionsService.getAllItemCompositions();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getItemCompositionById(
    @Param('id') id: string,
  ): Promise<project_item_compositions | null> {
    return this.compositionsService.getItemCompositionById(id);
  }

  @Post(':itemId')
  async upsertComposition(@Param('itemId') itemId: string, @Body() data: any) {
    return await this.compositionsService.upsertItemComposition(itemId, data);
  }
}
