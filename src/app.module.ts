import { Module } from '@nestjs/common';
import { ProjectBatchesModule } from './project_batches/project_batches.module';

import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { ProjectProjectsModule } from './project_projects/project_projects.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CurrenciesController } from './currencies/currencies.controller';
import { CurrenciesService } from './currencies/currencies.service';

@Module({
  imports: [
    ProjectBatchesModule,
    AuthModule,
    PrismaModule,
    ItemsModule,
    ProjectProjectsModule,
    CurrenciesModule,
  ],

  providers: [UsersService],
})
export class AppModule {}
