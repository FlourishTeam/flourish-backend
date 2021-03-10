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
} = require('../resolvers/user-plant-resolvers');
const PlantType = require('../types/PlantType');
const { UserPlantType, FindPlantType } = require('../types/UserPlantType');

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description:
    'Root query: provides the option to query a single plant by id or by name',
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
        userPlantId: { type: GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) =>
        removeFromCollection(args.userPlantId, args.userId),
    },
    getMyPlants: {
      type: new GraphQLList(FindPlantType),
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => getMyPlants(args.userId),
    },
  }),
});

// "find by id"
// "find all"

module.exports = RootQuery;
