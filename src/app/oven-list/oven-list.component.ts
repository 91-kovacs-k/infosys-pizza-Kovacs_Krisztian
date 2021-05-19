import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { Oven } from '../models/oven';
import { OrderService } from '../services/order.service';
import { OvenService } from '../services/oven.service';

@Component({
  selector: 'app-oven-list',
  templateUrl: './oven-list.component.html',
  styleUrls: ['./oven-list.component.css'],
})
export class OvenListComponent implements OnInit {
  constructor(
    private ovenService: OvenService,
    private orderService: OrderService
  ) {}

  ovens: Oven[] = [];
  orders: Order[] = [];

  async ngOnInit() {
    this.ovens = await this.ovenService.loadOvens();
    this.orders = await this.orderService.loadOrders();
    this.calculateOvenTimers();
  }

  calculateOvenTimers(){ 
    let freeOvens = 0;
    let timeNow = new Date();

    for(let i = 0; i < this.ovens.length; i++){
      if((this.ovens[i].startTime - timeNow) >= 20){
        this.ovens[i].availability = true;
        this.ovens[i].startTime = 0;
      }
      if(this.ovens[i].availability == true){
        freeOvens++;
      }
    }

    let remainingTime: number[] = [];
    for(let i = 0; i < this.orders.length; i++){
      for(let j = 0; j < this.orders[i].remainingQuantity; j++){
        if(freeOvens > 0){
            freeOvens--;
            for(let k = 0; k < this.ovens.length; k++){
              if(this.ovens[k].availability == true){
                this.ovens[k].availability = false;
                this.ovens[k].startTime = timeNow;
              }
            }
        }else{
            nincs szabad sütő
        }
    }
    }
    
  }
  
}
