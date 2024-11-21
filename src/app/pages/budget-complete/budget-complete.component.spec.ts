import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCompleteComponent } from './budget-complete.component';

describe('BudgetCompleteComponent', () => {
  let component: BudgetCompleteComponent;
  let fixture: ComponentFixture<BudgetCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
