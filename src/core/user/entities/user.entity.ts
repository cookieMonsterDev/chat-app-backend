import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../types/user-roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  bio: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
  }
}
