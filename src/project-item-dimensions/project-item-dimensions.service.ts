import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectItemDimensionsService {
  constructor(private prisma: PrismaService) {}

  async upsertItemDimension(itemId: string, data: any) {
    console.log('data', data);
    return await this.prisma.project_item_dimensions.upsert({
      where: { item_id: itemId },
      update: data,
      create: { ...data, itemId: itemId },
    });
  }
}
