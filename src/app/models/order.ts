export interface Order {
  id: string; // rendelés azonosító
  quantity: number; // rendelt mennyiség
  remainingQuantity: number; // hátralévő mennyiség
  costumer: string; // vevő
  destinationLog: string; // a cím információk
  pizzaLog: string; // a rendelt pizzák
  priceLog: string; // az ár
  waitLog: string; // az elkészülés idejéhez tartozó információk
  status: string;
  orderTime: Date;
}
