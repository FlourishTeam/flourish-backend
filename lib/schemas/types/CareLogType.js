const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const PlantType = require('./PlantType');

const CareLogType = new GraphQLObjectType({
  name: 'CareLog',
  description: 'Default care log template',
  fields: () => ({
    userPlantLogId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    plantId: { type: GraphQLInt },
    userPlantId: { type: GraphQLInt },
    careDate: { type: GraphQLString },
    careType: { type: GraphQLString },
    careNote: { type: GraphQLString },
  }),
});

const MyCareHistoryType = new GraphQLObjectType({
  name: 'MyCareHistory',
  description: 'Default care log template',
  fields: () => ({
    plantDetails: { type: new GraphQLList(PlantType) },
    careLogs: { type: new GraphQLList(CareLogType) },
    userPlantId: { type: GraphQLInt },
  }),
});

module.exports = { MyCareHistoryType, CareLogType };
