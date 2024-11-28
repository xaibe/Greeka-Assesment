import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

/**
 * DTO for updating an existing task.
 */
export class UpdateTaskDto
{
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Task name must be a string' })
    name?: string;


    @ApiProperty()
    @IsOptional()
    @IsString()
    details?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString({}, { message: 'Due date must be a valid date' })
    dueDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TaskStatus, { message: 'Invalid status value' })
    status?: TaskStatus;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TaskPriority, { message: 'Invalid priority value' })
    priority?: TaskPriority;

    @ApiProperty()
    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean value' })
    isActive?: boolean;
}
