import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ListTaskDto
{
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1; // Default page is 1

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10; // Default limit is 10

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    from?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    to?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(['Pending', 'Done', 'In Progress', 'Paused'], { message: 'Invalid status' })
    status?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(['Red', 'Yellow', 'Blue'], { message: 'Invalid priority' })
    priority?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    text?: string;
}
