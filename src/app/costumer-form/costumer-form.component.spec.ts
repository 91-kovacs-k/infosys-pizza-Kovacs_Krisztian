import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerFormComponent } from './costumer-form.component';

describe('CostumerFormComponent', () => {
  let component: CostumerFormComponent;
  let fixture: ComponentFixture<CostumerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
