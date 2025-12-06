import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username']) 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @Column()
  password: string;
}
