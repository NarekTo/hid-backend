import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsGateway } from '../gateways/items.gateway';

@Injectable()
export class ItemsService {
  constructor(
    private itemsGateway: ItemsGateway,
    private prisma: PrismaService,
  ) {}

  async getAllItems() {
    return this.prisma.project_items.findMany();
  }
  async getItemsByBatchNumber(batchNumber: string) {
    return this.prisma.project_items.findMany({
      where: { batch_number: batchNumber },
    });
  }

  async getItemById(itemId: string) {
    return this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });
  }

  async getItemInfoById(itemId: string) {
    const projectItems = await this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });

    const projectSpecifications =
      await this.prisma.project_item_specs.findUnique({
        where: { item_id: itemId },
      });

    const projectCompositions =
      await this.prisma.project_item_compositions.findUnique({
        where: { item_id: itemId },
      });

    const projectDimensions =
      await this.prisma.project_item_dimensions.findUnique({
        where: { item_id: itemId },
      });

    return {
      projectItems,
      projectSpecifications,
      projectCompositions,
      projectDimensions,
    };
  }

  async createItem(data: any) {
    return this.prisma.project_items.create({ data });
  }

  async updateItem(itemId: string, data: any) {
    const item = await this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${itemId} not found`);
    }

    const updatedItem = await this.prisma.project_items.update({
      where: { Item_id: itemId },
      data,
    });

    this.itemsGateway.server.emit('itemUpdated', updatedItem);

    return updatedItem;
  }

  async deleteItem(itemId: string) {
    return this.prisma.project_items.delete({
      where: { Item_id: itemId },
    });
  }
}
