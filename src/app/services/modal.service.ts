import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private visibilityControl = new BehaviorSubject<boolean>(false);

  constructor(private dialog: Dialog) {}

  get isVisible$() {
    return this.visibilityControl.asObservable();
  }

  show(): DialogRef<ErrorModalComponent, ErrorModalComponent> {
    return this.dialog.open(ErrorModalComponent);
  }
}
