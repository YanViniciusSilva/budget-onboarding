import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, computed, signal } from '@angular/core';
import { QuestionsCarouselComponent } from '../questions-carousel/questions-carousel.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FirebaseService } from '../../services/firebase.service';
import { ModalService } from '../../services/modal.service';
import { ModalModule, SpinnerModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { FirebaseQuestionsModel } from '../../models/questions.model';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    NgOptimizedImage,
    QuestionsCarouselComponent,
    ContactFormComponent,
    CommonModule,
    ModalModule,
    SpinnerModule,
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent implements AfterViewInit {
  step = this.firebaseService.currentStep;
  computedTitleByStep = computed(() =>
    this.step() === 1 ? 'Salve!' : 'Quase lá!',
  );
  isLoading = signal<boolean>(true);

  questions = signal<FirebaseQuestionsModel[] | []>([]);

  constructor(
    private firebaseService: FirebaseService,
    private modal: ModalService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.firebaseService
      .getQuestions()
      .then((questions) => {
        this.questions.set(questions);
      })
      .finally(() => this.isLoading.set(false));
  }

  onSubmit(event: boolean): void {
    this.isLoading.set(true);
    this.firebaseService.goToNextStep();

    if (event && this.step() === 3) {
      this.firebaseService
        .saveBudget()
        .then((res) => {
          if (res) {
            this.router.navigate(['complete']);
          }
        })
        .catch((error) => {
          console.error(error);
          this.modal.show().closed.subscribe(() => {
            this.firebaseService.backToInitialStep();
          });
        })
        .finally(() => this.isLoading.set(false));
    } else {
      this.isLoading.set(false);
    }
  }
}
