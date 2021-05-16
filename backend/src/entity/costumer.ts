import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Costumer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  zip: number;

  @Column()
  city: string;

  @Column()
  address1: string;

  @Column()
  address2: number;

  @Column()
  telephonePrefix: number;

  @Column()
  telephone: string;

  @Column()
  isSelected: boolean;
}
