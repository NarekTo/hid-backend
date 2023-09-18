import { Module } from '@nestjs/common';
import { ProjectBatchesModule } from './project_batches/project_batches.module';

import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ProjectBatchesModule, AuthModule, PrismaModule, ItemsModule],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
