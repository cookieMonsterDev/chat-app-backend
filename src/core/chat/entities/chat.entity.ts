import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ChatTypes } from '../types/chat-types';
import { User } from 'src/core/user/entities/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: ChatTypes, default: ChatTypes.CHAT })
  chatType: ChatTypes;

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
  }
}
