import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ChatTypes } from '../types/chat-types';
import { User } from 'src/core/user/entities/user.entity';
import { Message } from 'src/core/message/entities/message.entity';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: ChatTypes, default: ChatTypes.CHAT })
  chatType: ChatTypes;

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
