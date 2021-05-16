import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  bakeTime = 20;

  async loadPizza(): Promise<Pizza[]> {
    return this.http.get<Pizza[]>('/api/pizza').toPromise();
  }

  async filterPizza(search: string): Promise<Pizza[]> {
    return this.http
      .get<Pizza[]>('/api/pizza', { params: { search } })
      .toPromise();
  }

  async addPizza(newPizza: Pizza) {
    return this.http.post<Pizza>('/api/pizza', newPizza).toPromise();
  }

  async getPizzaById(id: string) {
    return this.http.get<Pizza>('/api/pizza/' + id).toPromise;
  }

  async deletePizza(id: string) {
    return this.http.delete('/api/pizza/' + id).toPromise();
  }

  async updatePizza(pizza: Pizza) {
    return this.http.post('/api/pizza/' + pizza.id, pizza).toPromise();
  }
}
