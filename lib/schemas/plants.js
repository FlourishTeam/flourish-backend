const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const schema = new GraphQLSchema({
  // query: QueryType
});

module.exports = graphqlHTTP({
  // schema,
  graphiql: true,
});
