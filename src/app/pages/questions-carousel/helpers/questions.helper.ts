export interface QuestionModel {
  id: number;
  question: string;
  options: OptionModel[];
}

export interface OptionModel {
  id: number;
  description: string;
  isChecked?: boolean;
}

export const questions: QuestionModel[] = [
  {
    id: 1,
    question: 'Qual o tamanho aproximadamente?',
    options: [
      {
        id: 1,
        description: 'Até 5cm',
      },
      {
        id: 2,
        description: '5 a 15cm',
      },
      {
        id: 3,
        description: '15 a 30cm',
      },
      {
        id: 4,
        description: 'Fechamento',
      },
    ],
  },
  {
    id: 2,
    question: 'Qual o estilo de arte?',
    options: [
      {
        id: 1,
        description: 'Lettering',
      },
      {
        id: 2,
        description: 'Realismo',
      },
      {
        id: 3,
        description: 'Flash tattoo',
      },
      {
        id: 4,
        description: 'Outro',
      },
    ],
  },
  {
    id: 3,
    question: 'Qual o local da tatoo?',
    options: [
      {
        id: 1,
        description: 'Cabeça',
      },
      {
        id: 2,
        description: 'Pescoço',
      },
      {
        id: 3,
        description: 'Peito',
      },
      {
        id: 4,
        description: 'Costela',
      },
      {
        id: 5,
        description: 'Costas',
      },
      {
        id: 6,
        description: 'Ombro',
      },
      {
        id: 7,
        description: 'Braço',
      },
      {
        id: 8,
        description: 'Antebraço',
      },
      {
        id: 9,
        description: 'Mão',
      },
      {
        id: 10,
        description: 'Cabeça',
      },
      {
        id: 11,
        description: 'Peito',
      },
      {
        id: 12,
        description: 'Pé',
      },
    ],
  },
];
