const { initializeApp } = require('firebase-admin/app');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const authentication = getAuth();
const db = getFirestore();

const checkIfAdmin = (auth) => auth?.token?.accountType === 'admin';

exports.changeAdminRole = onCall(async ({ data }) => {
  const { uid, isAdmin } = data;
  try {
    // Check if your an administrator
    // if (!checkIfAdmin(auth)) {
    //   return new HttpsError('unauthenticated', 'Request not authorized. User must be a admin to fulfull request.')
    // }

    // Your an admin, make the user an admin
    const { customClaims } = await authentication.getUser(uid);
    await authentication.setCustomUserClaims(uid, {
      ...customClaims,
      accountType: isAdmin ? 'admin' : 'user',
    });
    await db
      .doc(`users/${uid}`)
      .set({ role: isAdmin ? 'admin' : 'user' }, { merge: true });
    return 'Request fulfilled';
  } catch (error) {
    throw new HttpsError('unknown', `${error}`);
  }
});

exports.deleteUser = onCall(async ({ data, auth }) => {
  const { uid } = data;
  try {
    // Check if your an administrator
    if (!checkIfAdmin(auth))
      return new HttpsError(
        'unauthenticated',
        'Request not authorized. User must be a admin to fulfull request.',
      );

    await authentication.deleteUser(uid);
    return `User ${uid} has been deleted`;
  } catch (error) {
    throw new HttpsError('unknown', `${error}`);
  }
});
