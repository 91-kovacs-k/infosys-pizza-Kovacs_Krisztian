import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Costumer } from './costumer';
import { Pizza } from './pizza';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  remainingQuantity: number;

  @ManyToMany((type) => Costumer)
  @JoinTable()
  costumer: Costumer;

  @ManyToMany((type) => Pizza)
  @JoinTable()
  selectedPizza: Pizza[];

  @Column()
  destinationLog: string;

  @Column()
  pizzaLog: string;

  @Column()
  priceLog: string;

  @Column()
  waitLog: string;

  @Column()
  status: string;
}
