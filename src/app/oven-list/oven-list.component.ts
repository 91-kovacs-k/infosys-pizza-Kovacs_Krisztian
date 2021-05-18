import { Component, OnInit } from '@angular/core';
import { Oven } from '../models/oven';
import { OvenService } from '../services/oven.service';

@Component({
  selector: 'app-oven-list',
  templateUrl: './oven-list.component.html',
  styleUrls: ['./oven-list.component.css'],
})
export class OvenListComponent implements OnInit {
  constructor(private ovenService: OvenService) {}

  ovens: Oven[] = [];

  async ngOnInit() {
    this.ovens = await this.ovenService.loadOvens();
  }
}
