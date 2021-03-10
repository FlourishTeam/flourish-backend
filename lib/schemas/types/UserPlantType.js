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
    common_name: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
      resolve: (parent) => imageScraper(parent.common_name),
    },
  }),
});

module.exports = { UserPlantType, FindPlantType };
