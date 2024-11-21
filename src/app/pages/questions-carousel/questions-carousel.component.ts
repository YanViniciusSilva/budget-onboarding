import {
  AfterViewInit,
  Component,
  EventEmitter,
  input,
  Output,
  signal,
} from '@angular/core';
import {
  FormArray,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseQuestionsModel } from '../../models/questions.model';

@Component({
  selector: 'app-questions-carousel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CarouselModule],
  templateUrl: './questions-carousel.component.html',
  styleUrls: ['./questions-carousel.component.css'],
})
export class QuestionsCarouselComponent implements AfterViewInit {
  questions = input.required<FirebaseQuestionsModel[]>();
  @Output() formSubmitted = new EventEmitter<boolean>(false);

  isLoading = signal(true);
  activeIndex = signal<number>(0);

  form = this.fb.group({
    questions: this.fb.array([]),
  });

  isFirstQuestionOnForm = signal<boolean>(true);

  get activeIndexValue() {
    return this.activeIndex();
  }

  get questionsForm() {
    return this.form.get('questions') as UntypedFormArray;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private firebaseService: FirebaseService,
  ) {}

  buildForm(questions: FirebaseQuestionsModel[]) {
    questions.map((question) => {
      this.questionsForm.push(
        this.fb.group({
          questionId: this.fb.control(question.questionId),
          question: this.fb.control(question.questionName),
          options: this.fb.array(
            question.options.map((option) =>
              this.fb.control(
                {
                  questionId: question.questionId,
                  id: option.optionId,
                  description: option.value,
                  isChecked: false,
                },
                Validators.required,
              ),
            ),
          ),
        }),
      );

      if (questions.length === this.questionsForm.length) {
        this.isLoading.set(false);
      }
    });
  }

  getOptions(questionIndex: number): FormArray {
    return this.questionsForm.at(questionIndex).get('options') as FormArray;
  }

  isLastQuestionOnForm(questionIndex: number): boolean {
    return questionIndex === this.questionsForm.length - 1;
  }

  iisFirstQuestionOnForm(questionIndex: number): boolean {
    return questionIndex === 0;
  }

  hasNoOptionSelected(questionIndex: number): boolean {
    return this.questionsForm
      .at(questionIndex)
      .get('options')
      ?.value.every((option: any) => option.isChecked === false);
  }

  onSelectOption(questionIndex: number, optionIndex: number): void {
    const optionsArray = this.questionsForm
      .at(questionIndex)
      .get('options') as FormArray;
    const optionControl = optionsArray.at(optionIndex);

    if (optionControl) {
      optionControl.patchValue({
        questionId: optionControl.value.questionId,
        id: optionControl.value.id,
        description: optionControl.value.description,
        isChecked: !optionControl.value.isChecked,
      });

      optionsArray.controls.forEach((option) => {
        if (option !== optionControl) {
          option.patchValue({
            questionId: option.value.questionId,
            id: option.value.id,
            description: option.value.description,
            isChecked: false,
          });
        }
      });
    }
  }

  onItemChange(index: any) {
    this.activeIndex.set(index);
  }

  ngAfterViewInit(): void {
    this.buildForm(this.questions());
  }

  onSubmit(): void {
    if (!this.isLastQuestionOnForm(this.activeIndexValue)) {
      return;
    }

    const optionsSelected = this.questionsForm.controls.map((question) => {
      return question
        .get('options')
        ?.value.find((option: any) => option.isChecked);
    });

    this.firebaseService.buildBudgetPayload({ optionsSelected });
    this.formSubmitted.emit(true);
  }
}
