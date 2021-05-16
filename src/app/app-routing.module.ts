import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumerFormComponent } from './costumer-form/costumer-form.component';
import { CostumerListComponent } from './costumer-list/costumer-list.component';
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';

const routes: Routes = [
  {
    path: '',
    component: PizzaListComponent,
  },
  {
    path: 'pizza-form',
    component: PizzaFormComponent,
  },
  {
    path: 'costumer-list',
    component: CostumerListComponent,
  },
  {
    path: 'costumer-form',
    component: CostumerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
