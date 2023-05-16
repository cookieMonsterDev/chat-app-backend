import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChat {
  @PrimaryGeneratedColumn('uuid')
  id: number;
}
