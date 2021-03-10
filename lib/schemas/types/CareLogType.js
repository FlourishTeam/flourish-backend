const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'CareLog',
  description: 'Default care log template',
  fields: () => ({
    userId: { type: GraphQLInt },
    plantId: { type: GraphQLInt },
    userPlantId: { type: GraphQLInt },
    plantNote: { type: GraphQLString },
    careDate: { type: GraphQLString },
    careNote: { type: GraphQLString },
  }),
});
