import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

// Mock repository factory
const mockTaskRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

// Reusable mock user
const mockUser = {
  id: 'someId',
  username: 'TestUser',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: ReturnType<typeof mockTaskRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    taskRepository = module.get(getRepositoryToken(Task));
  });

  // ---------------------------------
  // getTasks
  // ---------------------------------
  describe('getTasks', () => {
    it('calls repository.find and returns tasks', async () => {
      taskRepository.find.mockResolvedValue(['someTask']);
      const result = await tasksService.getTasks(mockUser as any);
      expect(result).toEqual(['someTask']);
    });
  });

  // ---------------------------------
  // getTaskById
  // ---------------------------------
  describe('getTaskById', () => {
    it('returns the task when found', async () => {
      const mockTask = { title: 'Test task', description: 'Desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('someId', mockUser as any);
      expect(result).toEqual(mockTask);
    });

    it('throws when task not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      await expect(
        tasksService.getTaskById('someId', mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------
  // createTask
  // ---------------------------------
  describe('createTask', () => {
    it('creates and saves a task', async () => {
      const dto = { title: 'Test task', description: 'Test desc' };

      taskRepository.create.mockReturnValue('someTask');
      taskRepository.save.mockResolvedValue('someTask');

      const result = await tasksService.createTask(dto, mockUser as any);

      expect(result).toEqual('someTask');
      expect(taskRepository.save).toHaveBeenCalled();
    });
  });

  // ---------------------------------
  // deleteTask
  // ---------------------------------
  describe('deleteTask', () => {
    it('successfully deletes a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });

      await tasksService.deleteTask('someId', mockUser as any);

      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 'someId',
        user: mockUser,
      });
    });

    it('throws when no task is deleted', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(
        tasksService.deleteTask('someId', mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------------
  // updateTaskStatus
  // ---------------------------------
  describe('updateTaskStatus', () => {
    it('updates a task status', async () => {
      const mockTask = {
        title: 'Test task',
        status: TaskStatus.OPEN,
        save: jest.fn(),
      };

      tasksService.getTaskById = jest.fn().mockResolvedValue(mockTask);

      const result = await tasksService.updateTaskStatus(
        'someId',
        TaskStatus.DONE,
        mockUser as any,
      );

      expect(mockTask.status).toBe(TaskStatus.DONE);
      expect(result.status).toBe(TaskStatus.DONE);
    });
  });
});
