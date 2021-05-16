import { getRepository } from 'typeorm';
import { Controller } from './controller';
import { Pizza } from '../entity/pizza';

export default class PizzaController extends Controller {
  repository = getRepository(Pizza);

  getAll = async (req, res) => {
    const search = req.query.search || '';

    try {
      const entities = await this.repository
        .createQueryBuilder('pizza')
        .where("pizza.name LIKE CONCAT('%', :search, '%')", {
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
