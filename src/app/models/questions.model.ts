export interface Budget {
  name: string;
  phone: string;
  optionsSelected: Array<object>;
}

export interface FirebaseQuestionsModel {
  questionId: 1;
  questionName: 'Qual o tamanho aproximadamente?';
  options: Array<OptionsModel>;
}

interface OptionsModel {
  optionId: number;
  value: string;
}
