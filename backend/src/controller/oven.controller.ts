import { getRepository } from 'typeorm';
import { Oven } from '../entity/oven';
import { Controller } from './controller';

export default class OvenController extends Controller {
  repository = getRepository(Oven);
}
