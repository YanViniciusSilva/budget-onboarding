import { Routes } from '@angular/router';
import { IntroductionComponent } from './pages/introduction/introduction.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'introduction',
  },
  {
    path: 'introduction',
    component: IntroductionComponent,
  },
];
