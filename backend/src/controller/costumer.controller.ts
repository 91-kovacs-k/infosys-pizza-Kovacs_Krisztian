import { getRepository } from 'typeorm';
import { Controller } from './controller';
import { Costumer } from '../entity/costumer';

export default class CostumerController extends Controller {
  repository = getRepository(Costumer);

  getAll = async (req, res) => {
    const search = req.query.search || '';

    try {
      const entities = await this.repository
        .createQueryBuilder('costumer')
        .where("costumer.name LIKE CONCAT('%', :search, '%')", {
          search: search,
        })
        .getMany();
      res.json(entities);
    } catch (err) {
      console.error(err);
      this.handleError(res);
    }
  };
}
