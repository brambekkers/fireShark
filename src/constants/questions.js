import { average } from "firebase/firestore";

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
  'multipleAnswer', 
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
    wrongAnswers: 0,
    correctAnswers: 0,
    percentageCorrect: 0,
    answered: 0,
    averageTime: 0,
    unanswered: 0,
  },
}