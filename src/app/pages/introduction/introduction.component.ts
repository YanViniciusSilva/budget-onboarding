import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { QuestionsCarouselComponent } from '../questions-carousel/questions-carousel.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [NgOptimizedImage, QuestionsCarouselComponent, ContactFormComponent],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent {
  step = signal<number>(1);

  showSubmit(event: boolean) {
    this.step.update((value) => value + 1);
  }
}
