const CareLog = require('../../models/Care_Log');

// getLogsByPlantId grabs all logs associated to a single plant id from our database 
const getLogsByPlantId = (userPlantId) => {
  return CareLog.findLogsByPlantId(userPlantId).then((res) => res);
};

// removeLogByLogId removes all logs associated to a single plant id from our database 
const removeLogByLogId = (userPlantLogId) => {
  return CareLog.deleteLogByLogId(userPlantLogId).then((res) => res);
};

module.exports = {
  getLogsByPlantId
  removeLogByLogId
};
