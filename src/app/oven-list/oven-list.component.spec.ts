import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvenListComponent } from './oven-list.component';

describe('OvenListComponent', () => {
  let component: OvenListComponent;
  let fixture: ComponentFixture<OvenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
