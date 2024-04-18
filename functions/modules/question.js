const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { db } = require('./firebase');

const normalizeData = (data) => {
  return {
    wrongAnswers: data?.wrongAnswers || 0,
    correctAnswers: data?.correctAnswers || 0,
    averageTime: data?.averageTime || 0,
    totalTime: data?.totalTime || 0,
    answered: data?.answered || 0,
    unanswered: data?.unanswered || 0,
  };
};

calculateNewData = (data, isAnswerCorrect, time) => {
  const wrongAnswers = data.wrongAnswers + (isAnswerCorrect ? 0 : 1);
  const correctAnswers = data.correctAnswers + (isAnswerCorrect ? 1 : 0);
  const answered = data.answered + 1;

  return {
    wrongAnswers,
    correctAnswers,
    percentageCorrect: (correctAnswers / (correctAnswers + wrongAnswers)) * 100,
    answered: answered,
    averageTime: (data.averageTime * data.answered + time) / answered,
    totalTime: data.totalTime + time,
    unanswered: data?.unanswered,
  };
};

const updateQuestionData = async (data) => {
  const { group, topic, question, time, isAnswerCorrect } = data;
  const questionRef = db.doc(
    `groups/${group}/topics/${topic}/questions/${question}`,
  );

  // Get the question data
  const questionDoc = await questionRef.get();
  if (!questionDoc.exists) {
    return new HttpsError('not-found', 'Question not found');
  }

  // Update the question data
  const qData = normalizeData(questionDoc.data().data);
  const newData = calculateNewData(qData, isAnswerCorrect, time);

  // Save the updated question data
  questionRef.set({ data: newData }, { merge: true });
};

const updateUserData = async (data) => {
  const { time, isAnswerCorrect, uid } = data;
  const userStatsRef = db.doc(`users/${uid}/data/stats`);
  const userDoc = await userStatsRef.get();
  if (!userDoc.exists) {
    return new HttpsError('not-found', 'User not found');
  }
  const uData = normalizeData(userDoc.data());
  const newData = calculateNewData(uData, isAnswerCorrect, time);

  // Save the updated question data
  userStatsRef.set(newData, { merge: true });
};

const updateTopicScore = async (data) => {
  const { topic, uid, isAnswerCorrect } = data;

  const userTopicRef = db.doc(`users/${uid}/data/topics`);
  const userTopics = await userTopicRef.get();

  let topics = {};
  if (userTopics.exists) topics = userTopics.data();
  if (!topics[topic]) topics[topic] = { id: topic, score: 0 };

  // Calculate the new score based on the current score and a random number between 0 and 1.
  const score = topics[topic].score;
  let newScore = score

  // If the answer is correct, increase the score
  if (isAnswerCorrect) newScore = Math.min(score + (Math.random() * (100 - score)) / 100, 100);
  else newScore = Math.max(score - (Math.random() * score) / 100, 0);

  // Update the score.
  topics[topic].score = newScore;

  // Save the updated topic data
  userTopicRef.set(topics, { merge: true });
};

exports.handleQuestionOutcome = onCall(async ({ data }) => {
  try {
    updateQuestionData(data);
    updateUserData(data);
    updateTopicScore(data);
  } catch (err) {
    throw new HttpsError('unknown', `${error}`);
  }
});
