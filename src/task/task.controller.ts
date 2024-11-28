import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
@ApiTags("Tasks")
@Controller('tasks')
export class TaskController
{
  constructor(private readonly taskService: TaskService) { }

  /**
   * Create a new task.
   * @param createTaskDto Task creation data.
   * @returns The created task.
   */
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>
  {
    try
    {
      return await this.taskService.createTask(createTaskDto);
    } catch (error)
    {
      throw new HttpException(
        { message: 'Failed to create task', error: error.message },
        error.status || 500,
      );
    }
  }

  /**
   * Update an existing task.
   * @param id Task ID.
   * @param updateTaskDto Task update data.
   * @returns The updated task.
   */
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task>
  {
    try
    {
      return await this.taskService.updateTask(id, updateTaskDto);
    } catch (error)
    {
      throw new HttpException(
        { message: 'Failed to update task', error: error.message },
        error.status || 500,
      );
    }
  }

  /**
   * Delete a task by ID.
   * @param id Task ID.
   */
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void>
  {
    try
    {
      await this.taskService.deleteTask(id);
    } catch (error)
    {
      throw new HttpException(
        { message: 'Failed to delete task', error: error.message },
        error.status || 500,
      );
    }
  }

  /**
   * Fetch a list of tasks with pagination and filters.
   * @param query Query parameters for listing tasks.
   * @returns A paginated list of tasks.
   */
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'from', required: false, type: String, example: '2024-01-01' })
  @ApiQuery({ name: 'to', required: false, type: String, example: '2024-12-31' })
  @ApiQuery({ name: 'status', required: false, example: 'Pending' })
  @ApiQuery({ name: 'priority', required: false, example: 'Red' })
  @ApiQuery({ name: 'text', required: false, example: 'Follow up' })
  async listTasks(@Query() query: ListTaskDto)
  {
    try
    {
      return await this.taskService.listTasks(query);
    } catch (error)
    {
      throw new HttpException(
        { message: 'Failed to fetch tasks', error: error.message },
        error.status || 500,
      );
    }
  }

  /**
   * Fetch a single task by ID.
   * @param id Task ID.
   * @returns The task details.
   */
  @Get(':id')
  async fetchOneTask(@Param('id') id: string): Promise<Task>
  {
    try
    {
      return await this.taskService.fetchOneTask(id);
    } catch (error)
    {
      throw new HttpException(
        { message: 'Failed to fetch task', error: error.message },
        error.status || 500,
      );
    }
  }
}
