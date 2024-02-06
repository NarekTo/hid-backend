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

  async getItemsByProjectNumber(projectNumber: string) {
    return this.prisma.project_items.findMany({
      where: {
        job_id: projectNumber,
      },
    });
  }

  async getItemsByBatchNumber(batchNumber: string) {
    return this.prisma.project_items.findMany({
      where: {
        batch_number: batchNumber,
        item_status: {
          not: 'IZ',
        },
      },
    });
  }

  async getItemById(itemId: string) {
    return this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });
  }

  async getItemInfoById(itemId: string) {
    const item = await this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });

    const itemSpecifications = await this.prisma.project_item_specs.findMany({
      where: { item_id: itemId },
    });

    const itemCompositions =
      await this.prisma.project_item_compositions.findMany({
        where: { item_id: itemId },
      });

    const itemDimensions = await this.prisma.project_item_dimensions.findMany({
      where: { item_id: itemId },
    });

    return {
      item,
      itemSpecifications,
      itemCompositions,
      itemDimensions,
    };
  }

  async createItem(data: any) {
    const newItem = await this.prisma.project_items.create({ data });

    // Emit the 'itemAdded' event with the new item as the payload
    this.itemsGateway.server.emit('itemAdded', newItem);

    return newItem;
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
    const deletedItem = await this.prisma.project_items.delete({
      where: { Item_id: itemId },
    });

    // Emit the 'itemDeleted' event with the deleted item as the payload
    this.itemsGateway.server.emit('itemDeleted', deletedItem);

    return deletedItem;
  }

  async updateItemStatus(itemId: string, status: string) {
    const item = await this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${itemId} not found`);
    }

    const updatedItem = await this.prisma.project_items.update({
      where: { Item_id: itemId },
      data: {
        item_status: status,
      },
    });

    this.itemsGateway.server.emit('itemUpdated', updatedItem);

    return updatedItem;
  }

  async upsertItem(
    type: string,
    itemId: string,
    data: any[],
    action: 'merge' | 'overwrite',
  ) {
    switch (type) {
      case 'itemDimensions':
        if (action === 'overwrite') {
          await this.prisma.project_item_dimensions.deleteMany({
            where: { item_id: itemId },
          });
        }
        for (const item of data) {
          const trimmedItemId = item.item_id.trim();
          console.log('trimmedItemId', trimmedItemId);

          // Check if a record with the same item_id and spec_code already exists
          const existingRecord =
            await this.prisma.project_item_dimensions.findUnique({
              where: {
                item_id_spec_code: {
                  item_id: trimmedItemId,
                  spec_code: item.spec_code,
                },
              },
            });

          // If the record doesn't exist or if the action is 'overwrite', upsert the record
          if (!existingRecord && action === 'merge') {
            await this.prisma.project_item_dimensions.upsert({
              where: {
                item_id_spec_code: {
                  item_id: trimmedItemId,
                  spec_code: item.spec_code,
                },
              },
              update: { ...item, item_id: trimmedItemId },
              create: { ...item, item_id: trimmedItemId },
            });
          } else if (action === 'overwrite') {
            // If the action is 'overwrite', insert the new record
            await this.prisma.project_item_dimensions.create({
              data: { ...item, item_id: trimmedItemId },
            });
          }
        }
        break;
      case 'itemSpecifications':
        // If the action is 'overwrite', delete all existing specifications for the target item_id
        if (action === 'overwrite') {
          await this.prisma.project_item_specs.deleteMany({
            where: { item_id: itemId },
          });
        }

        // Retrieve the highest sequence number for the target item_id
        const maxSequence = await this.prisma.project_item_specs.aggregate({
          where: { item_id: itemId },
          _max: {
            sequence: true,
          },
        });

        let nextSequence = (maxSequence._max.sequence || 0) + 1;

        for (const spec of data) {
          const trimmedItemId = spec.item_id.trim();
          console.log('trimmedItemId', trimmedItemId);

          // Create a copy of the spec object and remove the identity column
          let specCopy = { ...spec };
          delete specCopy.spec_id;

          if (action === 'merge') {
            // Increment the sequence number for each spec during merge
            await this.prisma.project_item_specs.create({
              data: {
                ...specCopy,
                item_id: trimmedItemId,
                sequence: nextSequence++,
              },
            });
          } else if (action === 'overwrite') {
            // For overwrite, simply insert the new spec
            await this.prisma.project_item_specs.create({
              data: { ...specCopy, item_id: trimmedItemId },
            });
          }
        }
        break;
      case 'itemCompositions':
        if (action === 'overwrite') {
          await this.prisma.project_item_compositions.deleteMany({
            where: { item_id: itemId },
          });
        }

        for (const composition of data) {
          const trimmedItemId = composition.item_id.trim();
          console.log('trimmedItemId', trimmedItemId);

          const existingComposition =
            await this.prisma.project_item_compositions.findUnique({
              where: {
                item_id_material_code: {
                  item_id: trimmedItemId,
                  material_code: composition.material_code,
                },
              },
            });

          if (!existingComposition && action === 'merge') {
            await this.prisma.project_item_compositions.upsert({
              where: {
                item_id_material_code: {
                  item_id: trimmedItemId,
                  material_code: composition.material_code,
                },
              },
              update: { ...composition, item_id: trimmedItemId },
              create: { ...composition, item_id: trimmedItemId },
            });
          } else if (action === 'overwrite') {
            await this.prisma.project_item_compositions.create({
              data: { ...composition, item_id: trimmedItemId },
            });
          }
        }
        break;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }

  async getItemDetailsForPdf(itemId: string) {
    // Retrieve item information
    const item = await this.prisma.project_items.findUnique({
      where: { Item_id: itemId },
    });

    const itemSpecifications = await this.prisma.project_item_specs.findMany({
      where: { item_id: itemId },
    });

    const itemCompositions =
      await this.prisma.project_item_compositions.findMany({
        where: { item_id: itemId },
      });

    const itemDimensions = await this.prisma.project_item_dimensions.findMany({
      where: { item_id: itemId },
    });

    // Retrieve company (manufacturer) information
    const companyInfo = await this.prisma.lookup_company_addresses.findFirst({
      where: { company_id: item.manufacturer_id },
    });

    // Combine all the information into a single object
    return {
      item,
      itemSpecifications,
      itemDimensions,
      itemCompositions,
      companyInfo,
      // Include this only if it's relevant to the PDF
    };
  }
}
