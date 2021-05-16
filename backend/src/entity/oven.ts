import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Oven {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ovenTimer: string;

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
