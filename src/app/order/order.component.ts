import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Costumer } from '../models/costumer';
import { Order } from '../models/order';
import { Pizza } from '../models/pizza';
import { CostumerService } from '../services/costumer.service';
import { OrderService } from '../services/order.service';
import { PizzaService } from '../services/pizza.service';
import { ToastService } from '../services/toast.service';

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
    private fb: FormBuilder,
    public toastService: ToastService,
    private router: Router
  ) {}

  costumers: Costumer[] = [];
  pizzaArray: Pizza[] = [];
  orders: Order[] = [];
  buyer!: Costumer;
  selectedPizzaArray: Pizza[] = [];

  async ngOnInit() {
    this.costumers = await this.costumerService.loadCostumers();
    this.pizzaArray = await this.pizzaService.loadPizza();
    this.orders = await this.orderService.loadOrders();
    this.buyer = this.getBuyer();
    this.selectedPizzaArray = this.getSelectedPizzaArray();
  }

  getBuyer() {
    let buyer!: Costumer;
    for (let i = 0; i < this.costumers.length; i++) {
      if (this.costumers[i].isSelected == true) {
        buyer = this.costumers[i];
        break;
      }
    }
    return buyer;
  }

  getSelectedPizzaArray() {
    let selectedPizzaArray: Pizza[] = [];
    for (let i = 0; i < this.pizzaArray.length; i++) {
      if (this.pizzaArray[i].selected > 0) {
        selectedPizzaArray.push(this.pizzaArray[i]);
      }
    }
    return selectedPizzaArray;
  }

  async makeOrder() {
    let quantity = 0;
    for (let i = 0; i < this.selectedPizzaArray.length; i++) {
      quantity += this.selectedPizzaArray[i].selected;
    }

    let remainingQuantity = quantity;
    let destinationLog = this.destinationLogger(this.buyer);
    let pizzaLog = this.listSelectedPizza(this.selectedPizzaArray);
    let priceLog = this.priceCalculator(this.selectedPizzaArray);
    let waitlog;
    let status = 'waiting';
    let orderTime = new Date();

    let newOrder = this.fb.group({
      id: [],
      quantity: [quantity],
      remainingQuantity: [remainingQuantity],
      costumer: [this.buyer.name],
      selectedPizza: [this.selectedPizzaArray],
      destinationLog: [destinationLog],
      pizzaLog: [pizzaLog],
      priceLog: [priceLog.toString()],
      waitLog: [''],
      status: [status],
      orderTime: [orderTime],
    });

    await this.orderService.addOrder(newOrder.value);
    this.showSuccess();
    await this.wait(3);
    this.router.navigateByUrl('/order-list');
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

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  showSuccess() {
    this.toastService.show('Sikeres rendelés rögzítés!', {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms * 1000));
  }
}
