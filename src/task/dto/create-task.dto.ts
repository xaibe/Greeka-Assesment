import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

/**
 * DTO for creating a new task.
 */
export class CreateTaskDto
{
    @ApiProperty({ example: 'Walk_time', required: true })
    @IsNotEmpty({ message: 'Task name is required' })
    @IsString({ message: 'Task name must be a string' })
    name: string;

    @ApiProperty({ example: 'time of walk', required: false })
    @IsOptional()
    @IsString()
    details?: string;

    @ApiProperty({ example: '2024-11-28T07:31:13.083Z', required: true })
    @IsNotEmpty({ message: 'Due date is required' })
    @IsDateString({}, { message: 'Due date must be a valid date' })
    dueDate: Date;

    @ApiProperty({ enum: TaskStatus, required: false })
    @IsOptional()
    @IsEnum(TaskStatus, { message: 'Status must be one of the following: Pending, InProgress, Completed, or Canceled' })
    status?: TaskStatus;

    @ApiProperty({ enum: TaskPriority })
    @IsOptional()
    @IsEnum(TaskPriority, { message: 'Priority must be one of the following: Red, Blue or Yellow' })
    priority?: TaskPriority;

    @ApiProperty()
    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean value' })
    isActive?: boolean;
}