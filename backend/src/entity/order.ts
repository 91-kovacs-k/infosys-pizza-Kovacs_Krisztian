import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  remainingQuantity: number;

  @Column()
  costumer: string;

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
