const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { db } = require('./firebase');

const normalizeData = (data) => {
  return {
    wrongAnswers : data?.wrongAnswers || 0,
    correctAnswers : data?.correctAnswers || 0,
    averageTime : data?.averageTime || 0,
    totalTime : data?.totalTime || 0,
    answered : data?.answered || 0,
    unanswered : data?.unanswered || 0,
  }
}

calculateNewData = (data, isAnswerCorrect, time) => {
  const wrongAnswers = data.wrongAnswers + (isAnswerCorrect ? 0 : 1)
  const correctAnswers = data.correctAnswers + (isAnswerCorrect ? 1 : 0)
  const answered = data.answered + 1

  return {
    wrongAnswers,
    correctAnswers,
    percentageCorrect: (correctAnswers / (correctAnswers + wrongAnswers)) * 100,
    answered: answered,
    averageTime: ((data.averageTime * data.answered) + time) / answered,
    totalTime: data.totalTime + time,
    unanswered: data?.unanswered
  }
}

const updateQuestionData = async (data) => {
  const { group, topic, question, time, isAnswerCorrect } = data
  const questionRef = db.doc(`groups/${group}/topics/${topic}/questions/${question}`);

  // Get the question data
  const questionDoc = await questionRef.get()
  if(!questionDoc.exists) {
    return new HttpsError('not-found', 'Question not found');
  }

  // Update the question data
  const qData = normalizeData(questionDoc.data().data)
  const newData = calculateNewData(qData, isAnswerCorrect, time)

  // Save the updated question data
  questionRef.set({ data: newData }, { merge: true })
}

const updateUserData = async (data) => {
  const { time, isAnswerCorrect, uid } = data
  const userRef = db.doc(`users/${uid}/data/stats`);
  const userDoc = await userRef.get()
  if(!userDoc.exists) {
    return new HttpsError('not-found', 'User not found');
  }
  const uData = normalizeData(userDoc.data())
  const newData = calculateNewData(uData, isAnswerCorrect, time)

  // Save the updated question data
  userRef.set(newData, { merge: true })
}

const updateTopicScore = async () => {

}

exports.handleQuestionOutcome = onCall(async ({ data }) => {
  try {
    updateQuestionData(data)
    updateUserData(data)
    updateTopicScore(data)
  } catch (err) {
    throw new HttpsError('unknown', `${error}`);

  }
});

