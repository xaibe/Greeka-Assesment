import
{
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>, // Correct repository type
  ) { }

  /**
   * Create a new task.
   * @param createTaskDto Data Transfer Object for creating a task.
   * @returns The created task.
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task>
  {
    try
    {
      const task = this.taskRepository.create(createTaskDto); // Use repository to create an entity
      return await this.taskRepository.save(task); // Save the entity
    } catch (error)
    {
      console.log("error", error);

      throw new BadRequestException('Failed to create task. Check input data.');
    }
  }

  /**
   * Update an existing task.
   * @param id Task ID.
   * @param updateTaskDto Data Transfer Object for updating a task.
   * @returns The updated task.
   */
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>
  {
    const task = await this.taskRepository.findOne({ where: { id } }); // Updated `findOne` syntax
    if (!task)
    {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    try
    {
      return await this.taskRepository.save(task);
    } catch (error)
    {
      throw new BadRequestException('Failed to update task. Check input data.');
    }
  }

  /**
   * Delete a task by ID.
   * @param id Task ID.
   */
  async deleteTask(id: string): Promise<void>
  {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
    {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  /**
   * Fetch a paginated list of tasks with optional filters.
   * @param query Query parameters for pagination and filtering.
   * @returns A paginated list of tasks.
   */
  async listTasks(query: ListTaskDto)
  {
    const { page = 1, limit = 10, from, to, status, priority, text } = query;

    const skip = (page - 1) * limit;

    // Build the query with filters
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (from)
    {
      queryBuilder.andWhere('task.dueDate >= :from', { from });
    }

    if (to)
    {
      queryBuilder.andWhere('task.dueDate <= :to', { to });
    }

    if (status)
    {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (priority)
    {
      queryBuilder.andWhere('task.priority = :priority', { priority });
    }

    if (text)
    {
      queryBuilder.andWhere(
        'task.name ILIKE :text OR task.details ILIKE :text',
        { text: `%${text}%` },
      );
    }

    // Add pagination
    queryBuilder.skip(skip).take(limit);

    // Execute the query
    const [tasks, total] = await queryBuilder.getManyAndCount();

    // Return paginated response
    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Fetch a single task by ID.
   * @param id Task ID.
   * @returns The task.
   */
  async fetchOneTask(id: string): Promise<Task>
  {
    const task = await this.taskRepository.findOne({ where: { id } }); // Updated `findOne` syntax
    if (!task)
    {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
