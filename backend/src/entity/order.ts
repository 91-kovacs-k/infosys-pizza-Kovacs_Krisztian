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
  selectedCostumer!: Costumer;

  @Column()
  selectedPizza: Pizza[];

  @ManyToMany(() => Pizza, (selectedPizza) => selectedPizza.id, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  selectedPizzas: Pizza[];
}
