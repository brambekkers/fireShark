const { onCall } = require('firebase-functions/v2/https');
const { db } = require('./firebase');

const generate32BitInt = () => {
  return Math.floor(Math.random() * 0x100000000) | 0;
}

const getDocuments = async (collection) => {
  const randomNum = generate32BitInt()
  const snapshot = await db.collection(collection).where("random", ">=", randomNum).limit(1).get()
  if (snapshot.empty) {
    return getDocuments(collection)
  }
  return snapshot.docs[0].data()
}

exports.getRandomQuestion = onCall(async ({ data }) => {
  try {
    const randomDoc = await getDocuments(collection)
    return res.send(randomDoc)
  } catch (err) {
    return res.send(err)
  }
});

