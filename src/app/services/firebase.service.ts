import { computed, Injectable, signal } from '@angular/core';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../main';
import { Budget, FirebaseQuestionsModel } from '../models/questions.model';
import { StepsEnum } from '../enums/steps.enum';

const steps = [StepsEnum.contact, StepsEnum.questions, StepsEnum.complete];

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private budgetPayload = signal<Partial<Budget> | null>(null);

  private step = signal<number>(1);
  private computedStep = computed(() => this.step());
  allStepsCompleted = computed(() => this.step() === StepsEnum.complete);

  constructor() {}

  get currentStep() {
    return this.computedStep;
  }

  goToNextStep() {
    this.step.update((value) => {
      if (steps.includes(value + 1)) return value + 1;
      return value;
    });
  }

  backToInitialStep() {
    this.step.set(StepsEnum.contact);
  }

  buildBudgetPayload(budget: Partial<Budget>) {
    if (budget) {
      this.budgetPayload.update((content) => {
        if (content) {
          return {
            dateCreated: new Date().toISOString(),
            ...content,
            ...budget,
          };
        }
        return { ...budget };
      });
    }
  }

  async saveBudget() {
    return await addDoc(collection(db, 'budgets'), this.budgetPayload());
  }

  async getQuestions(): Promise<FirebaseQuestionsModel[]> {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    return querySnapshot.docs.map(
      (doc) => doc.data() as FirebaseQuestionsModel,
    );
  }
}
