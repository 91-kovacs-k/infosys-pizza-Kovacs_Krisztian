import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Costumer } from '../models/costumer';
import { CostumerService } from '../services/costumer.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-costumer-form',
  templateUrl: './costumer-form.component.html',
  styleUrls: ['./costumer-form.component.css'],
})
export class CostumerFormComponent implements OnInit {
  closeResult = '';
  costumers!: Costumer[];
  costumerKeyword!: string;
  success: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private costumerService: CostumerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) {}

  newCostumer = this.fb.group({
    id: [],
    name: ['', Validators.required],
    zip: [, [Validators.required, Validators.min(1000), Validators.max(9985)]],
    city: [, Validators.required],
    address1: [, Validators.required],
    address2: [
      ,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(873),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    telephonePrefix: [, Validators.required],
    telephone: [
      ,
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(7),
        Validators.maxLength(7),
      ],
    ],
    isSelected: [false],
  });
  get name() {
    return this.newCostumer.get('name');
  }
  get zip() {
    return this.newCostumer.get('zip');
  }
  get city() {
    return this.newCostumer.get('city');
  }
  get address1() {
    return this.newCostumer.get('address1');
  }
  get address2() {
    return this.newCostumer.get('address2');
  }
  get telephonePrefix() {
    return this.newCostumer.get('telephonePrefix');
  }
  get telephone() {
    return this.newCostumer.get('telephone');
  }
  async search() {
    this.costumers = await this.costumerService.filterCostumers(
      this.costumerKeyword
    );
  }

  async addCostumer() {
    let costumer = this.newCostumer.value;
    await this.costumerService.addCostumer(costumer);

    this.newCostumer.reset();
    this.showSuccess();
    await this.wait(3);
    this.router.navigateByUrl('/costumer-list');
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.addCostumer();
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
    this.costumers = await this.costumerService.loadCostumers();

    const id = this.activatedRoute.snapshot.queryParams.id;
    if (id) {
      for (let i = 0; i < this.costumers.length; i++) {
        if (this.costumers[i].id == id) {
          this.newCostumer.setValue(this.costumers[i]);
          break;
        }
      }
    }
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  showSuccess() {
    this.success = true;
    this.toastService.show('Sikeres vevő rögzítés!', {
      classname: 'bg-success text-light',
      delay: 1500,
    });
  }

  wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms * 1000));
  }
}
