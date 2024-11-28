import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MaskDirective } from '../../directives/mask.directive';
import { FirebaseService } from '../../services/firebase.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaskDirective],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Output() formSubmitted = new EventEmitter<boolean>(false);

  nameInputPlaceholder = 'Digite seu nome';
  nameInputMask = 'no-numbers';
  phoneInputPlaceholder = 'Digite seu telefone (DDD + Telefone)';
  phoneInputMask = '(00) 00000-0000';

  form = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    phone: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/),
    ]),
  });

  constructor(
    private firebaseService: FirebaseService,
    private fb: UntypedFormBuilder,
  ) {}

  onSubmit() {
    this.formSubmitted.emit(true);
    this.firebaseService.buildBudgetPayload(this.form.value);
  }
}
