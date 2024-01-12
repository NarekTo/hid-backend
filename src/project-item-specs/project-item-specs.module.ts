import { Module } from '@nestjs/common';
import { ProjectItemSpecsService } from './project-item-specs.service';
import { ProjectItemSpecsController } from './project-item-specs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Include PrismaModule in the imports array
  providers: [ProjectItemSpecsService],
  controllers: [ProjectItemSpecsController],
})
export class ProjectItemSpecsModule {}
