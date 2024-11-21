import { Routes } from '@angular/router';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { BudgetCompleteComponent } from './pages/budget-complete/budget-complete.component';
import { budgetCompleteGuard } from './security/guards/budget-complete.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    component: IntroductionComponent,
  },
  {
    path: 'complete',
    canActivate: [budgetCompleteGuard],
    component: BudgetCompleteComponent,
  },
];
