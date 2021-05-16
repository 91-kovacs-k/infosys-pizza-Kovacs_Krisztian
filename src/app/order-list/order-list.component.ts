import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  orders: Order[] = [];

  async ngOnInit() {
    this.orders = await this.orderService.loadOrders();
  }

  cancelOrder(order: Order) {}
}
