const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserPlantType',
  description: 'Default user plant template',
  fields: () => ({
    userPlantId: { type: GraphQLInt },
    plantId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  }),
});
