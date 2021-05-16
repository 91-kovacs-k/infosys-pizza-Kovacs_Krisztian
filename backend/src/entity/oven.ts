import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Time } from '../../../src/app/models/oven';

@Entity()
export class Oven {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ovenTimer: Time;

  @Column()
  availability: boolean;

  @Column()
  order: number; //fk

  @Column()
  pizza: number;

  @Column()
  progress: number;

  @Column()
  canUse: boolean;
}
