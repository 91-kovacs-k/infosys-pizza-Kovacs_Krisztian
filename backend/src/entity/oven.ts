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
  order: string;

  @Column()
  pizza: number;

  @Column()
  progress: number;

  @Column()
  canUse: boolean;
}
