import { getRepository } from 'typeorm';
import { Controller } from './controller';
import { Order } from '../entity/order';

export default class OrderController extends Controller {
  repository = getRepository(Order);
}
