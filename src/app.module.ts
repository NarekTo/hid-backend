import { Module } from '@nestjs/common';
import { ProjectBatchesModule } from './project_batches/project_batches.module';

import { AdminUsersModule } from './admin_users/admin_users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectBatchesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
