import { Costumer } from './costumer';
import { Pizza } from './pizza';

export interface Order {
  id: number; // rendelés azonosító
  quantity: number; // rendelt mennyiség
  remainingQuantity: number; // hátralévő mennyiség
  costumer: Costumer; // vevő
  selectedPizza: Pizza[]; // a rendelt pizzák
  destinationLog: string; // a cím információk
  pizzaLog: string; // a rendelt pizzák
  priceLog: string; // az ár
  waitLog: string; // az elkészülés idejéhez tartozó információk
  status: string;
}
