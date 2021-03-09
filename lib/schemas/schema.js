const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const RootQuery = require('./queries/RootQuery');

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
