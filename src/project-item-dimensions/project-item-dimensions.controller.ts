import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ProjectItemDimensionsService } from './project-item-dimensions.service';

@ApiTags('itemDimensions')
@Controller('item-dimensions')
@UseGuards(JwtAuthGuard)
export class ProjectItemDimensionsController {
  constructor(
    private readonly dimensionsService: ProjectItemDimensionsService,
  ) {}

  @Post(':itemId')
  @ApiBearerAuth()
  async upsertDimension(@Param('itemId') itemId: string, @Body() data: any) {
    return await this.dimensionsService.upsertItemDimension(itemId, data);
  }
}
