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

export const supportedTypes = [
  'singleAnswer', 
];

export const newQuestion = {
  parentId: '',
  headerImage: '',
  imageRef: null,
  id: null,
  type: 'singleAnswer',
  question: '',
  answers: [],
  data: {
    correctAnswers: 0,
    percentage: 0,
    totalQuestions: 0,
    totalTime: 0,
    unansweredQuestions: 0,
    wrongAnswers: 0,
  },
}