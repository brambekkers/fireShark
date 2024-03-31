const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

exports.authentication = getAuth();
exports.db = getFirestore();