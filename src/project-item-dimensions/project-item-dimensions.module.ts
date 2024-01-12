import { Module } from '@nestjs/common';
import { ProjectItemDimensionsService } from './project-item-dimensions.service';
import { ProjectItemDimensionsController } from './project-item-dimensions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProjectItemDimensionsService],
  controllers: [ProjectItemDimensionsController],
})
export class ProjectItemDimensionsModule {}
