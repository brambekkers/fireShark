const { initializeApp } = require('firebase-admin/app');
initializeApp();

module.exports = {
  ...require('./modules/admin.js'),
  ...require('./modules/user.js'),
  ...require('./modules/questions.js'),
  ...require('./modules/question.js'),
};
