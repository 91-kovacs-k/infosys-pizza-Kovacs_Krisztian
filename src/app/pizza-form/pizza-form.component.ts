import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pizza } from '../models/pizza';
import { PizzaService } from '../services/pizza.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css'],
})
export class PizzaFormComponent implements OnInit {
  closeResult = '';
  pizzaArray!: Pizza[];
  bakeTime = this.pizzaService.bakeTime;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  newPizza = this.fb.group({
    id: [],
    name: ['', Validators.required],
    description: ['', Validators.required],
    size: [32, [Validators.min(32), Validators.max(48)]],
    preparationTime: [this.bakeTime, [Validators.min(1), Validators.max(40)]],
    price: [1000, [Validators.min(1000), Validators.max(5000)]],
    imgUrl: [
      'https://megapng.com/images/bt/pizza-icon-8.png',
      Validators.pattern(/^http/),
    ],
  });

  get id() {
    return this.newPizza.get('id');
  }
  get name() {
    return this.newPizza.get('name');
  }
  get description() {
    return this.newPizza.get('description');
  }
  get size() {
    return this.newPizza.get('size');
  }
  get preparationTime() {
    return this.newPizza.get('preparationTime');
  }
  get price() {
    return this.newPizza.get('price');
  }
  get imgUrl() {
    return this.newPizza.get('imgUrl');
  }

  async addPizza() {
    let pizza = this.newPizza.value;
    pizza.selected = 0;
    await this.pizzaService.addPizza(pizza);

    this.newPizza.reset();
    this.router.navigateByUrl('/');
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.addPizza();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async ngOnInit() {
    this.pizzaArray = await this.pizzaService.loadPizza();
    const id = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      for (let i = 0; i < this.pizzaArray.length; i++) {
        if (this.pizzaArray[i].id == id) {
          this.newPizza.setValue(this.pizzaArray[i]);
          break;
        }
      }
    }
  }
}
