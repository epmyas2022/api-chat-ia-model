import { Module } from '@nestjs/common';
import { ModelIAModule } from '@/model-ia/model-ia.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './shared/environment/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvVariables,
    }),
    ModelIAModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
