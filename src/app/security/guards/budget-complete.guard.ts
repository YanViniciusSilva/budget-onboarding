import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class budgetCompleteGuard {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.firebaseService.allStepsCompleted()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
