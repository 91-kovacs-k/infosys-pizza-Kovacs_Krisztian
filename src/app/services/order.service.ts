import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  async loadOrders(): Promise<Order[]> {
    return this.http.get<Order[]>('/api/orders').toPromise();
  }

  async filterOrders(search: string): Promise<Order[]> {
    return this.http
      .get<Order[]>('/api/orders', { params: { search } })
      .toPromise();
  }

  async addOrder(newOrder: Order) {
    return this.http.post<Order>('/api/orders', newOrder).toPromise();
  }

  async getOrderById(id: string) {
    return this.http.get<Order>('/api/orders/' + id).toPromise;
  }

  async deleteOrder(id: string) {
    return this.http.delete('/api/orders/' + id).toPromise();
  }

  async updateOrder(order: Order) {
    return this.http.post('/api/orders/', order).toPromise();
  }
}
