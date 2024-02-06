import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async getAllImages() {
    return this.prisma.project_item_images.findMany();
  }

  async getImageById(imageId: any) {
    const image = await this.prisma.project_item_images.findUnique({
      where: { image_id_item_id: imageId },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }

    return image;
  }

  async createImage(data: any) {
    return this.prisma.project_item_images.create({ data });
  }

  async updateImage(imageId: any, data: any) {
    const image = await this.prisma.project_item_images.findUnique({
      where: { image_id_item_id: imageId },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }

    return this.prisma.project_item_images.update({
      where: { image_id_item_id: imageId },
      data,
    });
  }

  async deleteImage(imageId: any) {
    const image = await this.prisma.project_item_images.findUnique({
      where: { image_id_item_id: imageId },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }

    return this.prisma.project_item_images.delete({
      where: { image_id_item_id: imageId },
    });
  }
}