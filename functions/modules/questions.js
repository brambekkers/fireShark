const { onDocumentWritten, onDocumentDeleted } = require('firebase-functions/v2/firestore');

const { db } = require('./firebase');

const updateQuestionAmount = async ({gid, tid}) => {
  const questionsRef = db.collection(`groups/${gid}/topics/${tid}/questions`)
  const topicRef = db.doc(`groups/${gid}/topics/${tid}`);

  // Get the current amount of questions in the collection
  const questionsSnap = await questionsRef.get()
  const questionAmount = questionsSnap.size

  // Set the current amount of questions to the parent topic
  topicRef.set({ questionAmount }, { merge: true });
}

exports.onNewQuestion = onDocumentWritten("groups/{gid}/topics/{tid}/questions/{qid}", async (event) => await updateQuestionAmount(event.params));
exports.onDeleteQuestion = onDocumentDeleted("groups/{gid}/topics/{tid}/questions/{qid}", async (event) => await updateQuestionAmount(event.params));



