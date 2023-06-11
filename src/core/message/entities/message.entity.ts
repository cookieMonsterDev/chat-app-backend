import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/core/user/entities/user.entity';
import { Chat } from 'src/core/chat/entities/chat.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
