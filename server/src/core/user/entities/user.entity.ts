import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRoles } from '../types/user-roles.types';
import { Message } from 'src/core/message/entities/message.entity';
import { Chat } from 'src/core/chat/entities/chat.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid')
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

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
