const { onCall, HttpsError } = require('firebase-functions/v2/https');

const { authentication, db } = require('./firebase');
const { isAdmin, isModerator } = require('./helpers');

const checkIfUserIsComplete = async (data) => {
  const { firstName, lastName, email, password, position } = data;
  if (!firstName || !lastName || !email || !password || position.length === 0) {
    return false;
  }
  return true;
};

const setUserProfile = async (uid, data) => {
  const { firstName, lastName, email, password, position } = data;

  // Update the user role in the database as well
  const userRef = db.doc(`users/${uid}`);
  await userRef.set({
    email,
    firstName,
    lastName,
    settings: db.doc(`users/${uid}/data/settings`),
    stats: db.doc(`users/${uid}/data/stats`),
    topics: db.doc(`users/${uid}/data/topics`),
    role: 'user',
    uid,
  });
};

const setUserStats = async (uid) => {
  const userRef = db.doc(`users/${uid}/data/stats`);
  await userRef.set({
    correctAnswers: 0,
    percentage: 0,
    totalQuestions: 0,
    totalTime: 0,
    unansweredQuestions: 0,
    wrongAnswers: 0,
  });
};

const setUserSettings = async (uid, data) => {
  const { position } = data;

  const userRef = db.doc(`users/${uid}/data/settings`);
  await userRef.set({
    darkMode: false,
    language: 'en',
    position,
    profileImageUrl: '',
  });
};

const setUserTopics = async (uid) => {
  const userRef = db.doc(`users/${uid}/data/topics`);
  await userRef.set({});
};

exports.createUser = onCall(async ({ data, auth }) => {
  try {
    if (!checkIfUserIsComplete(data)) {
      return new HttpsError(
        'invalid-argument',
        'Request not valid. Please fill out all fields.',
      );
    }

    // Check if your an administrator or moderator
    if (!isAdmin(auth) && !isModerator(auth)) {
      return new HttpsError(
        'unauthenticated',
        'Request not authorized. User must be a admin or Moderator to fulfill request.',
      );
    }
    const { firstName, lastName, email, password } = data;

    const userRecord = await authentication.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    const uid = userRecord.uid;

    // Update the user role in the authentication system
    await authentication.setCustomUserClaims(uid, { role: 'user' });

    // Update the user data in the database as well
    await setUserProfile(uid, data);
    await setUserStats(uid);
    await setUserSettings(uid, data);
    await setUserTopics(uid);

    return 'Request fulfilled';
  } catch (error) {
    throw new HttpsError('unknown', `${error}`);
  }
});

exports.deleteUser = onCall(async ({ data, auth }) => {
  const { uid } = data;
  try {
    // Check if your an administrator
    if (!isAdmin(auth) && !isModerator(auth)) {
      return new HttpsError(
        'unauthenticated',
        'Request not authorized. User must be a admin to fulfull request.',
      );
    }

    await authentication.deleteUser(uid);
    return `User ${uid} has been deleted`;
  } catch (error) {
    throw new HttpsError('unknown', `${error}`);
  }
});
