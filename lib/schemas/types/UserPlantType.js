const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { imageScraper } = require('../resolvers/plant-resolvers');

const UserPlantType = new GraphQLObjectType({
  name: 'UserPlantType',
  description: 'Default user plant template',
  fields: () => ({
    userPlantId: { type: GraphQLInt },
    plantId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  }),
});

const FindPlantType = new GraphQLObjectType({
  name: 'FindPlantType',
  description: 'Template for find method',
  fields: () => ({
    commonName: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
      resolve: (parent) => imageScraper(parent.commonName),
    },
    plantId: { type: GraphQLInt },
  }),
});

module.exports = { UserPlantType, FindPlantType };
