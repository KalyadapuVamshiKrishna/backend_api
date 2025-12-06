import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Registers the repository
    AuthModule, // Allows us to use AuthGuard in the controller
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
