import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from '../models/pizza';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.pizzaArray = await this.pizzaService.loadPizza();
    for (let i = 0; i < this.pizzaArray.length; i++) {
      for (let j = 0; j < this.pizzaArray[i].selected; j++) {
        this.selectedPizza.push(this.pizzaArray[i]);
      }
    }
    //alert(this.pizzaService.selectedPizza);
  }

  closeResult = '';
  pizzaKeyword!: string;
  pizzaArray: Pizza[] = [];
  selectedPizza: Pizza[] = [];

  async searchPizza() {
    this.pizzaArray = await this.pizzaService.filterPizza(this.pizzaKeyword);
  }

  async deletePizza(id: string) {
    await this.pizzaService.deletePizza(id);
    this.pizzaArray = await this.pizzaService.loadPizza();
  }

  open(content: any, id: string) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.deletePizza(id);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  navigateToPizzaForm(id: string) {
    this.router.navigate(['/pizza-form'], {
      queryParams: {
        id: id,
      },
    });
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

  resetSelection() {
    this.selectedPizza = [];
    this.pizzaArray.forEach((pizza: Pizza) => (pizza.selected = 0));
    /*
    this.pizzaArray.forEach((pizza: Pizza) =>
      this.pizzaService.updatePizza(pizza)
    );*/
    /*
    this.costumerIsSelected = false;
    this.selectedCostumer = {
      id: 0,
      name: 'null',
      zip: 0,
      city: 'null',
      address1: 'null',
      address2: 0,
      telephonePrefix: 0,
      telephone: 'null',
    };
    */
  }

  selectPizza(pizza: Pizza) {
    this.selectedPizza.push(pizza);
    for (let i = 0; i < this.pizzaArray.length; i++) {
      if (this.pizzaArray[i] == pizza) {
        this.pizzaArray[i].selected++;
        this.pizzaService.updatePizza(this.pizzaArray[i]);
        break;
      }
    }
  }

  deselectPizza(pizza: Pizza) {
    let contained = false;
    for (let i = 0; i < this.selectedPizza.length; i++) {
      if (this.selectedPizza[i] == pizza) {
        this.selectedPizza.splice(i, 1);
        this.selectedPizza = this.selectedPizza;
        contained = true;
        break;
      }
    }
    if (contained) {
      for (let i = 0; i < this.pizzaArray.length; i++) {
        if (this.pizzaArray[i] == pizza) {
          this.pizzaArray[i].selected--;
          this.pizzaService.updatePizza(this.pizzaArray[i]);
          break;
        }
      }
    }
  }
}
