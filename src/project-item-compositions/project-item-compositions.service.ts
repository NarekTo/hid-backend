import { Injectable } from '@nestjs/common';
import { Prisma, project_item_compositions } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectItemCompositionsService {
  constructor(private prisma: PrismaService) {}

  async getAllItemCompositions(): Promise<project_item_compositions[]> {
    return this.prisma.project_item_compositions.findMany();
  }

  async getItemCompositionById(
    itemId: string,
  ): Promise<project_item_compositions | null> {
    return this.prisma.project_item_compositions.findUnique({
      where: { item_id: itemId },
    });
  }
  async upsertItemComposition(itemId: string, data: any) {
    return await this.prisma.project_item_compositions.upsert({
      where: { item_id: itemId },
      update: data,
      create: { ...data, itemId: itemId },
    });
  }
}
