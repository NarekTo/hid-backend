import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ProjectBatchesService } from 'src/project_batches/project_batches.service';
import { ProjectProjectsService } from 'src/project_projects/project_projects.service';

@ApiTags('items')
@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(
    private projectBatchesService: ProjectBatchesService,
    private projectProjectsService: ProjectProjectsService,
    private itemsService: ItemsService, // Inject ItemsService
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all items' })
  getAllItems() {
    return this.itemsService.getAllItems();
  }

  @Get('batch/:batchNumber')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all items with the same batch number' })
  getItemsByBatchNumber(@Param('batchNumber') batchNumber: string) {
    return this.itemsService.getItemsByBatchNumber(batchNumber);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return item by id' })
  getItemById(@Param('id') itemId: string) {
    return this.itemsService.getItemById(itemId);
  }

  @Get('info/:id')
  @ApiBearerAuth()
  async getItemInfoById(@Param('id') itemId: string) {
    // Call the getItemInfoById method from the ItemsService
    const itemInfo = await this.itemsService.getItemInfoById(itemId);
    for (let key in itemInfo) {
      if (typeof itemInfo[key] === 'string') {
        itemInfo[key] = itemInfo[key].trim();
      }
    }
    return itemInfo;
  }

  @Get('/tabledata/:id/:batchNumber')
  @ApiBearerAuth()
  async getItemData(
    @Param('id', ParseIntPipe) id: number,
    @Param('batchNumber', ParseIntPipe) batchNumber: string,
  ) {
    const project = await this.projectProjectsService.findProjectById(id);
    const batch = await this.projectBatchesService.findBatch(
      id.toString(),
      batchNumber,
    );
    const items = await this.itemsService.getAllItems(); // Retrieve all items
    return { project, batch, items };
  }

  @Get('project/:projectNumber')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all items in a project' })
  getItemsByProjectNumber(@Param('projectNumber') projectNumber: string) {
    return this.itemsService.getItemsByProjectNumber(projectNumber);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update an item' })
  updateItem(@Param('id') itemId: string, @Body() data: any) {
    return this.itemsService.updateItem(itemId, data);
  }

  @Put(':id/status')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update item status' })
  updateItemStatus(
    @Param('id') itemId: string,
    @Body('status') status: string,
  ) {
    return this.itemsService.updateItemStatus(itemId, status);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create a new item' })
  createItem(@Body() data: any) {
    return this.itemsService.createItem(data);
  }

  @Post(':type/:itemId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update items dim/comps/specs' })
  async upsertItem(
    @Param('type') type: string,
    @Param('itemId') itemId: string,
    @Body() data: any,
  ) {
    const { action, ...itemsData } = data;
    if (action !== 'merge' && action !== 'overwrite') {
      throw new Error(
        'Invalid action. Action must be either "merge" or "overwrite".',
      );
    }
    const itemsArray = Object.values(itemsData);
    return await this.itemsService.upsertItem(type, itemId, itemsArray, action);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete an item' })
  deleteItem(@Param('id') itemId: string) {
    return this.itemsService.deleteItem(itemId);
  }
}
