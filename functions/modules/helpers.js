exports.isAdmin = (auth) => auth?.token?.role === 'admin';
exports.isModerator = (auth) => auth?.token?.role === 'moderator';