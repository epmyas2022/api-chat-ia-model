import { Module } from '@nestjs/common';
import { ModelIAModule } from '@/model-ia/model-ia.module';

@Module({
  imports: [ModelIAModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
