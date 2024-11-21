import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { budgetCompleteGuard } from './budget-complete.guard';

describe('budgetCompleteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => budgetCompleteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
