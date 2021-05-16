export interface Costumer {
  id: string; // vevő azonosító
  name: string; // név
  zip: number; // irányítószám
  city: string; // város
  address1: string; // utca
  address2: number; // házszám
  telephonePrefix: number; // szolgáltató
  telephone: string; // telefonszám
  isSelected: boolean;
}
