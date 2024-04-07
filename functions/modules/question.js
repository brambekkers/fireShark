const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { db } = require('./firebase');

exports.handleQuestionOutcome = onCall(async ({ data }) => {
  const { group, topic, question, time, isAnswerCorrect } = data
  try {
    return await getDocuments(data)
  } catch (err) {
    throw new HttpsError('unknown', `${error}`);

  }
});

