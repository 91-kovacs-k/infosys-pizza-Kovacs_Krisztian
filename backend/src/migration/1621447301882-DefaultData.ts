import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { DefaultPizza } from './pizza.migration';
import { DefaultCostumers } from './costumers.migration';

export class DefaultData1621447301882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pizza = await getRepository('Pizza').save(DefaultPizza);
    const costumers = await getRepository('Costumer').save(DefaultCostumers);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
