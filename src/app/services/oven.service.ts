import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oven } from '../models/oven';

@Injectable({
  providedIn: 'root',
})
export class OvenService {
  constructor(private http: HttpClient) {}

  async loadOvens(): Promise<Oven[]> {
    return this.http.get<Oven[]>('/api/ovens').toPromise();
  }

  async addOven(newOven: Oven) {
    return this.http.post<Oven>('/api/ovens', newOven).toPromise();
  }

  async getPOvenById(id: string) {
    return this.http.get<Oven>('/api/ovens/' + id).toPromise;
  }

  async updateOven(oven: Oven) {
    return this.http.post('/api/ovens/', oven).toPromise();
  }
}
