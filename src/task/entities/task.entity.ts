import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


/**
 * Enum for Task Status
 */
export enum TaskStatus
{
    PENDING = 'Pending',
    DONE = 'Done',
    IN_PROGRESS = 'In Progress',
    PAUSED = 'Paused',
}

/**
 * Enum for Task Priority
 */
export enum TaskPriority
{
    RED = 'Red', // High priority
    YELLOW = 'Yellow', // Medium priority
    BLUE = 'Blue', // Normal priority
}

/**
 * Task Entity representing the database schema.
 */
@Entity('tasks')
export class Task
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    details: string;

    @Column({ type: 'date' })
    dueDate: Date;

    @Column({ type: 'enum', enum: ['Pending', 'Done', 'In Progress', 'Paused'] })
    status: string;

    @Column({ type: 'enum', enum: ['Red', 'Yellow', 'Blue'] })
    priority: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
