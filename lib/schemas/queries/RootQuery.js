const { MyCareHistoryType, CareLogType } = require('../types/CareLogType');
const { UserPlantType, FindPlantType } = require('../types/UserPlantType');
const PlantType = require('../types/PlantType');
const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require('graphql');
const {
  getPlantByName,
  getPlantById,
} = require('../resolvers/plant-resolvers');
const {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyCareHistoryById,
  removeLogByLogId,
  addLogById,
} = require('../resolvers/user-plant-resolvers');

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    plantByName: {
      type: new GraphQLList(PlantType),
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => getPlantByName(args.name),
    },

    plantById: {
      type: PlantType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => getPlantById(args.id),
    },

    addToCollection: {
      type: UserPlantType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        plantId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => addToCollection(args.userId, args.plantId),
    },

    removeFromCollection: {
      type: UserPlantType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        plantId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) =>
        removeFromCollection(args.plantId, args.userId),
    },

    getMyPlants: {
      type: new GraphQLList(FindPlantType),
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => getMyPlants(args.userId),
    },

    getMyCareHistoryById: {
      type: MyCareHistoryType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        plantId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) =>
        getMyCareHistoryById(args.userId, args.plantId),
    },

    addLogById: {
      type: CareLogType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        plantId: { type: GraphQLNonNull(GraphQLInt) },
        userPlantId: { type: GraphQLNonNull(GraphQLInt) },
        careDate: { type: GraphQLNonNull(GraphQLString) },
        careType: { type: GraphQLNonNull(GraphQLString) },
        careNote: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) =>
        addLogById(
          args.userId,
          args.plantId,
          args.userPlantId,
          args.careDate,
          args.careType,
          args.careNote
        ),
    },

    removeLogByLogId: {
      type: CareLogType,
      args: {
        userPlantLogId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => removeLogByLogId(args.userPlantLogId),
    },
  }),
});

module.exports = RootQuery;
