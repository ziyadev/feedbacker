import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envValidation } from '@/common/config/env';
import { AuthModule } from '@/modules/auth/auth.module';
import { DatabaseModule } from '@/modules/database/database.module';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate: envValidation,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   context: ({ req }) => ({ req }),
    //   debug: true,
    //   playground: true,
    // }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: CompositeAuthAPIStrategy,
    // },
  ],
})
export class AppModule {}
