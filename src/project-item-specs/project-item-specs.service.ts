import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectItemSpecsService {
  constructor(private prisma: PrismaService) {}

  async upsertItemSpecification(itemId: string, data: any) {
    return await this.prisma.project_item_specs.upsert({
      where: { item_id: itemId },
      update: data,
      create: { ...data, itemId: itemId },
    });
  }
}
