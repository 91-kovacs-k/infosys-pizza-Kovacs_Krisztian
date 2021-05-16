import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oven, Time } from '../models/oven';

@Injectable({
  providedIn: 'root',
})
export class OvenService {
  constructor(private http: HttpClient) {}
  ovens = this.loadOvens();

  async loadOvens() {
    return this.http.get<Oven[]>('api/ovens').toPromise;
  }

  async addOven() {
    let newOven = {
      availability: true,
      ovenTimer: new Time(),
      progress: 0,
      order: 0,
      pizza: 0,
      canUse: true,
    };
    return this.http.post<Oven>('/api/ovens', newOven).toPromise();
  }

  async getOvenById(id: string) {
    return this.http.get<Oven>('/api/ovens/' + id).toPromise;
  }

}
