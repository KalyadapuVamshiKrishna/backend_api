import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TasksModule} from './tasks/tasks.module';

@Module({
  imports: [
    // 1. Load the Environment Variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere in the app
    }),

    // 2. Connect to the Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'), // Automatically load entities (e.g., User, Task) we create later
        autoLoadEntities: true,

        // Synchronize schema with database (Great for Dev, Disable in Prod!)
        synchronize: true,
      }),
    }),
    AuthModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
