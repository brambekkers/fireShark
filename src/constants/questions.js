export const questionTypes = [
  'singleAnswer',
  'multipleAnswer',
  'trueFalse',
  'fillInTheBlank',
  'matching',
  'ordering',
  'coding',
  'opinion',
];

export const supportedTypes = ['singleAnswer', 'multipleAnswer', 'trueFalse'];

export const newQuestion = {
  parentId: '',
  headerImage: '',
  imageRef: null,
  id: null,
  type: 'singleAnswer',
  answerText: '',
  question: '',
  answers: [],
  data: {
    wrongAnswers: 0,
    correctAnswers: 0,
    percentageCorrect: 0,
    answered: 0,
    averageTime: 0,
    unanswered: 0,
  },
};

export const answerModelTrueFalse = {
  true: false,
  false: false,
};
