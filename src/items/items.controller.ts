import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@ApiTags('items')
@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all items' })
  getAllItems() {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return item by id' })
  getItemById(@Param('id') itemId: string) {
    return this.itemsService.getItemById(itemId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create a new item' })
  createItem(@Body() data: any) {
    return this.itemsService.createItem(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update an item' })
  updateItem(@Param('id') itemId: string, @Body() data: any) {
    return this.itemsService.updateItem(itemId, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete an item' })
  deleteItem(@Param('id') itemId: string) {
    return this.itemsService.deleteItem(itemId);
  }
}