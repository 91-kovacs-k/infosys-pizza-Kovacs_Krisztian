import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Costumer } from '../models/costumer';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor(private http: HttpClient) {}

  async loadCostumers(): Promise<Costumer[]> {
    return this.http.get<Costumer[]>('/api/costumers').toPromise();
  }

  async filterCostumers(search: string): Promise<Costumer[]> {
    return this.http
      .get<Costumer[]>('/api/costumers', { params: { search } })
      .toPromise();
  }

  async addCostumer(newCostumer: Costumer) {
    return this.http.post<Costumer>('/api/costumers', newCostumer).toPromise();
  }

  async getCostumerById(id: string) {
    return this.http.get<Costumer>('/api/costumers/' + id).toPromise;
  }

  async deleteCostumer(id: string) {
    return this.http.delete('/api/costumers/' + id).toPromise();
  }

  async updateCostumer(costumer: Costumer) {
    return this.http.post('/api/costumers/', costumer).toPromise();
  }
}
