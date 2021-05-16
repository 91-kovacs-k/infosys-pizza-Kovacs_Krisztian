import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column()
  preparationTime: number;

  @Column()
  price: number;

  @Column()
  imgUrl: string;

  @Column()
  selected: number;
}
