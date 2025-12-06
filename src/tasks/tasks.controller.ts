import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Protect entire controller using JWT strategy
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Req() req: Request & { user: User }): Promise<Task[]> {
    return this.tasksService.getTasks(req.user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @Req() req: Request & { user: User },
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, req.user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,

    @Req() req: Request & { user: User },
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @Req() req: Request & { user: User },
  ): Promise<void> {
    return this.tasksService.deleteTask(id, req.user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Req() req: Request & { user: User },
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, req.user);
  }
}
