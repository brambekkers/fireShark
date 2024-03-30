const { initializeApp } = require('firebase-admin/app');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const authentication = getAuth();
const db = getFirestore();

const isAdmin = (auth) => auth?.token?.role === 'admin';
const isModerator = (auth) => auth?.token?.role === 'moderator';

exports.changeUserRole = onCall(async ({ data, auth }) => {
  const { uid, role } = data;
  try {
    // Check if your an administrator or moderator
    if (!isAdmin(auth) && !isModerator(auth)) {
      return new HttpsError(
        'unauthenticated',
        'Request not authorized. User must be a admin or Moderator to fulfill request.',
      );
    }

    // Update the user role in the authentication system
    const { customClaims } = await authentication.getUser(uid);
    await authentication.setCustomUserClaims(uid, {
      ...customClaims,
      role,
    });

    // Update the user role in the database as well
    const userRef = db.doc(`users/${uid}`);
    await userRef.set({ role }, { merge: true });
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
