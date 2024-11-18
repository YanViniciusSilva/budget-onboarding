import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { QuestionModel, questions } from './helpers/questions.helper';
import {
  FormArray,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';

@Component({
  selector: 'app-questions-carousel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CarouselModule],
  templateUrl: './questions-carousel.component.html',
  styleUrls: ['./questions-carousel.component.css'],
})
export class QuestionsCarouselComponent implements AfterViewInit {
  readonly questions: QuestionModel[] = questions;

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
    private cdr: ChangeDetectorRef,
  ) {}

  buildForm() {
    this.questions.map((question) => {
      this.questionsForm.push(
        this.fb.group({
          questionId: this.fb.control(question.id),
          question: this.fb.control(question.question),
          options: this.fb.array(
            question.options.map((option) =>
              this.fb.control(
                {
                  questionId: question.id,
                  id: option.id,
                  description: option.description,
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

  onSelectOption(questionIndex: number, optionIndex: number) {
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
    this.buildForm();
  }

  submitForm() {
    if (!this.isLastQuestionOnForm(this.activeIndexValue)) {
      return;
    }

    const optionsSelected = this.questionsForm.controls.map((question) => {
      return question
        .get('options')
        ?.value.find((option: any) => option.isChecked);
    });
  }
}
