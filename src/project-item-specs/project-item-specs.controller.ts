import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectItemSpecsService } from './project-item-specs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@ApiTags('itemSpecs')
@Controller('project-item-specs')
@UseGuards(JwtAuthGuard)
export class ProjectItemSpecsController {
  constructor(private readonly specsService: ProjectItemSpecsService) {}

  @Post(':itemId')
  @ApiBearerAuth()
  async upsertSpecification(
    @Param('itemId') itemId: string,
    @Body() data: any,
  ) {
    return await this.specsService.upsertItemSpecification(itemId, data);
  }
}
