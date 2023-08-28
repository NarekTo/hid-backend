import { Module } from '@nestjs/common';
import { ProjectBatchesModule } from './project_batches/project_batches.module';

@Module({
  imports: [ProjectBatchesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
