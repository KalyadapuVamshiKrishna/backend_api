import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // ESTABLISH RELATIONSHIP
  @ManyToOne(() => User, { eager: false })
  @Exclude({ toPlainOnly: true }) // When returning JSON, don't show the entire User object inside the task
  user: User;
}
