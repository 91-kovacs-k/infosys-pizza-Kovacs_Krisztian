import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Costumer } from '../models/costumer';
import { Order } from '../models/order';
import { Pizza } from '../models/pizza';
import { CostumerService } from '../services/costumer.service';
import { OrderService } from '../services/order.service';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private pizzaService: PizzaService,
    private costumerService: CostumerService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  costumers: Costumer[] = [];
  pizzaArray: Pizza[] = [];
  orders: Order[] = [];

  async ngOnInit() {
    this.costumers = await this.costumerService.loadCostumers();
    this.pizzaArray = await this.pizzaService.loadPizza();
    this.orders = await this.orderService.loadOrders();
  }

  async makeOrder() {
    let buyer!: Costumer;
    for (let i = 0; i < this.costumers.length; i++) {
      if (this.costumers[i].isSelected == true) {
        buyer = this.costumers[i];
        break;
      }
    }

    let selectedPizzaArray: Pizza[] = [];
    for (let i = 0; i < this.pizzaArray.length; i++) {
      if (this.pizzaArray[i].selected > 0) {
        selectedPizzaArray.push(this.pizzaArray[i]);
      }
    }

    let quantity = 0;
    for (let i = 0; i < selectedPizzaArray.length; i++) {
      quantity += selectedPizzaArray[i].selected;
    }

    let remainingQuantity = quantity;
    let destinationLog = this.destinationLogger(buyer);
    let pizzaLog = this.listSelectedPizza(selectedPizzaArray);
    let priceLog = this.priceCalculator(selectedPizzaArray);
    let waitlog;
    let status = 'waiting';
    let orderTime = new Date();

    let newOrder = this.fb.group({
      id: [],
      quantity: [quantity],
      remainingQuantity: [remainingQuantity],
      costumer: [buyer.name],
      selectedPizza: [selectedPizzaArray],
      destinationLog: [destinationLog],
      pizzaLog: [pizzaLog],
      priceLog: [priceLog.toString()],
      waitLog: [''],
      status: [status],
      orderTime: [orderTime],
    });

    await this.orderService.addOrder(newOrder.value);
    this.resetValues();
  }

  destinationLogger(costumer: Costumer) {
    return (
      costumer.zip +
      ' ' +
      costumer.city +
      ', ' +
      costumer.address1 +
      ' út ' +
      +costumer.address2 +
      '.'
    );
  }

  listSelectedPizza(selectedPizza: Pizza[]) {
    selectedPizza.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
    let pizzaLog = ' - ' + selectedPizza[0].name;
    if (selectedPizza[0].selected > 1) {
      pizzaLog += ' * ' + selectedPizza[0].selected;
    }
    for (let i = 1; i < selectedPizza.length; i++) {
      pizzaLog += ',\n - ' + selectedPizza[i].name;
      if (selectedPizza[i].selected > 1) {
        pizzaLog += ' * ' + selectedPizza[i].selected;
      }
    }
    pizzaLog += '.';
    return pizzaLog;
  }

  priceCalculator(selectedPizza: Pizza[]) {
    let sum = 0;
    selectedPizza.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
    for (let i = 0; i < selectedPizza[0].selected; i++) {
      sum += selectedPizza[0].price;
    }
    for (let i = 1; i < selectedPizza.length; i++) {
      for (let j = 0; j < selectedPizza[i].selected; j++) {
        sum += selectedPizza[i].price;
      }
    }
    return sum;
  }

  resetValues() {
    this.costumers.forEach((costumer) => (costumer.isSelected = false));
    this.pizzaArray.forEach((pizza) => (pizza.selected = 0));

    for (let i = 0; i < this.costumers.length; i++) {
      this.costumerService.updateCostumer(this.costumers[i]);
    }
    for (let i = 0; i < this.pizzaArray.length; i++) {
      this.pizzaService.updatePizza(this.pizzaArray[i]);
    }
  }
  /*
  public waitLogger(order: Order, waitTime: number) {
    if (waitTime == 0) {
      if (this.getStatus() == 'done') {
        this.waitLog = 'A rendelés elkészült!';
      } else if (this.getStatus() == 'deleted') {
        this.waitLog = 'A rendelés törölve!';
      }
    } else {
      let minutesInString;
      let secondsInString;
      let minutes = Math.floor(waitTime / 60);
      let seconds = waitTime - minutes * 60;
      // minutes += 20;  // a szállítás idejét hozzáadom

      if (minutes < 10) {
        minutesInString = '0' + minutes.toString();
      } else {
        minutesInString = minutes.toString();
      }
      if (seconds < 10) {
        secondsInString = '0' + seconds.toString();
      } else {
        secondsInString = seconds.toString();
      }
      return (
        'Az elkészülésig ' +
        minutesInString +
        ':' +
        secondsInString +
        ' van hátra!\n'
      );
    }
  }*/
}
