import { getRepository } from 'typeorm';
import { Controller } from './controller';
import { Oven } from '../entity/oven';

export default class OvenController extends Controller {
  repository = getRepository(Oven);
}
