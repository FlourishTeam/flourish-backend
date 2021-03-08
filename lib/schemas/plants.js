const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");

const QueryType = new GraphQLObjectType({
  name: "Query",
  description:
    "Root query: provides a list of all plants, or the option to query a single plant by id",
  fields: () => ({
    plantByName: {
      type: PlantType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      // resolve: (parent, args) => getPlantByName(args.name),
    },
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
