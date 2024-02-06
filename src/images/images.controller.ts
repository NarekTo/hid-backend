import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@ApiTags('images')
@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all images' })
  getAllImages() {
    return this.imagesService.getAllImages();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return image by id' })
  getImageById(@Param('id') imageId: string) {
    return this.imagesService.getImageById(imageId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update an image' })
  updateImage(@Param('id') imageId: string, @Body() data: any) {
    return this.imagesService.updateImage(imageId, data);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create a new image' })
  createImage(@Body() data: any) {
    return this.imagesService.createImage(data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete an image' })
  deleteImage(@Param('id') imageId: string) {
    return this.imagesService.deleteImage(imageId);
  }
}