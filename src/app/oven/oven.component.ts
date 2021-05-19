import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Oven } from '../models/oven';
import { Pizza } from '../models/pizza';
import { OvenService } from '../services/oven.service';
import { PizzaService } from '../services/pizza.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-oven',
  templateUrl: './oven.component.html',
  styleUrls: ['./oven.component.css'],
})
export class OvenComponent implements OnInit {
  constructor(
    private ovenService: OvenService,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    public toastService: ToastService,
    private router: Router
  ) {}

  ovens: Oven[] = [];
  pizzaArray: Pizza[] = [];
  success: boolean = false;

  async ngOnInit() {
    this.ovens = await this.ovenService.loadOvens();
    this.pizzaArray = await this.pizzaService.loadPizza();
  }

  ovenConfiguration = this.fb.group({
    numberOfOvens: [
      ,
      [Validators.required, Validators.min(1), Validators.max(10)],
    ],
    bakeTime: [, [Validators.required, Validators.min(1), Validators.max(40)]],
  });
  get numberOfOvens() {
    return this.ovenConfiguration.get('numberOfOvens');
  }
  get bakeTime() {
    return this.ovenConfiguration.get('bakeTime');
  }

  async configureOvens() {
    let tmp = this.ovenConfiguration.value;
    let bakeTime = tmp.bakeTime;
    let numberOfOvens = tmp.numberOfOvens;

    for (let i = 0; i < this.pizzaArray.length; i++) {
      this.pizzaArray[i].preparationTime = bakeTime.toString();
      await this.pizzaService.updatePizza(this.pizzaArray[i]);
    }

    if (this.ovens.length > numberOfOvens) {
      for (let i = 0; i < numberOfOvens; i++) {
        this.ovens[i].canUse = true;
      }
      let tmp = numberOfOvens + 1;
      for (tmp; tmp < this.ovens.length; tmp++) {
        this.ovens[tmp].canUse = false;
      }
      for (let i = 0; i < this.ovens.length; i++) {
        await this.ovenService.updateOven(this.ovens[i]);
      }
    } else {
      for (let i = 0; i < this.ovens.length; i++) {
        this.ovens[i].canUse = true;
        await this.ovenService.updateOven(this.ovens[i]);
      }
      let remaining = numberOfOvens - this.ovens.length;
      let newOven = this.fb.group({
        id: [],
        ovenTimer: [''],
        availability: [true],
        order: [''],
        pizza: [0],
        progress: [0],
        canUse: [true],
      });
      for (let i = 0; i < remaining; i++) {
        await this.ovenService.addOven(newOven.value);
      }
    }

    this.showSuccess();
    await this.wait(3);
    this.router.navigateByUrl('/oven-list');
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  showSuccess() {
    this.success = true;
    this.toastService.show('Sikeres sütő konfigurálás!', {
      classname: 'bg-success text-light',
      delay: 1500,
    });
  }

  wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms * 1000));
  }
}
