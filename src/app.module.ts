import { Module } from '@nestjs/common';
import { ProjectBatchesModule } from './project_batches/project_batches.module';

import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { ProjectProjectsModule } from './project_projects/project_projects.module';
import { ProjectAuthorisationsModule } from './project_auth/project_authorisations.module';
import { ProjectItemSpecsModule } from './project-item-specs/project-item-specs.module';
import { ProjectItemCompositionsModule } from './project-item-compositions/project-item-compositions.module';
import { ProjectItemDimensionsModule } from './project-item-dimensions/project-item-dimensions.module';

@Module({
  imports: [
    ProjectBatchesModule,
    AuthModule,
    PrismaModule,
    ItemsModule,
    ProjectProjectsModule,
    ProjectAuthorisationsModule,
    ProjectItemSpecsModule,
    ProjectItemCompositionsModule,
    ProjectItemDimensionsModule,
    ProjectItemCompositionsModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
