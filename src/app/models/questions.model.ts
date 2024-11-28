export interface Budget {
  name: string;
  phone: string;
  optionsSelected: Array<object>;
}

export interface FirebaseQuestionsModel {
  questionId: number;
  questionName: string;
  options: Array<OptionsModel>;
}

interface OptionsModel {
  optionId: number;
  value: string;
}
