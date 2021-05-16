import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Costumer } from '../models/costumer';
import { CostumerService } from '../services/costumer.service';

@Component({
  selector: 'app-costumer-list',
  templateUrl: './costumer-list.component.html',
  styleUrls: ['./costumer-list.component.css'],
})
export class CostumerListComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private costumerService: CostumerService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.costumerArray = await this.costumerService.loadCostumers();
  }
  closeResult = '';
  costumerKeyword!: string;
  costumerArray: Costumer[] = [];
  selectedCostumer!: Costumer;
  costumerIsSelected!: boolean;

  async searchCostumer() {
    this.costumerArray = await this.costumerService.filterCostumers(
      this.costumerKeyword
    );
    for (let i = 0; i < this.costumerArray.length; i++) {
      if (this.costumerArray[i].isSelected == true) {
        this.selectedCostumer = this.costumerArray[i];
        this.costumerIsSelected = true;
        break;
      }
    }
  }

  async deleteCostumer(id: string) {
    await this.costumerService.deleteCostumer(id);
    this.costumerArray = await this.costumerService.loadCostumers();
  }

  open(content: any, id: string) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.deleteCostumer(id);
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

  public selectCostumer(costumer: Costumer) {
    if (this.selectedCostumer != costumer) {
      this.selectedCostumer = costumer;
      this.costumerIsSelected = true;
      for (let i = 0; i < this.costumerArray.length; i++) {
        if (this.costumerArray[i].id == costumer.id) {
          this.costumerArray[i].isSelected = true;
        } else {
          this.costumerArray[i].isSelected = false;
        }
        for (let i = 0; i < this.costumerArray.length; i++) {
          this.costumerService.updateCostumer(this.costumerArray[i]);
        }
      }
    } else {
      costumer.isSelected = false;
      this.costumerService.updateCostumer(costumer);
      this.resetSelection();
    }
  }

  resetSelection() {
    this.costumerIsSelected = false;
    this.selectedCostumer = {
      id: 'null',
      name: 'null',
      zip: 0,
      city: 'null',
      address1: 'null',
      address2: 0,
      telephonePrefix: 0,
      telephone: 'null',
      isSelected: false,
    };
  }

  navigateToCostumerForm(id: string) {
    this.router.navigate(['/costumer-form'], {
      queryParams: {
        id: id,
      },
    });
  }
}
