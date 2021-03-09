const UserPlant = require('../../models/UserPlant');

const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

module.exports = addToCollection;
