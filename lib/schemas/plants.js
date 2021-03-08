const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");

const getPlantByName = (name) => {
  // breaking here to build a Plant model method to get by name
};

const PlantType = new GraphQLObjectType({
  name: "plant",
  description: "plant template",
  fields: () => ({
    id: { type: GraphQLInt },
    image: { type: GraphQLString },
    common_name: { type: GraphQLString },
    synonyms: { type: GraphQLString },
    scientific_name: { type: GraphQLString },
    light_range: { type: GraphQLString },
    hydration_range: { type: GraphQLString },
    care_difficulty: { type: GraphQLString },
    pests_diseases: { type: GraphQLString },
    warnings: { type: GraphQLString },
    height: { type: GraphQLString },
    spread: { type: GraphQLString },
    type: { type: GraphQLString },
    flowering_period: { type: GraphQLString },
    bloom_size: { type: GraphQLString },
    temperature_range: { type: GraphQLString },
    placement: { type: GraphQLString },
    substrate_recommendation: { type: GraphQLString },
    potting_notes: { type: GraphQLString },
    watering: { type: GraphQLString },
    propagation: { type: GraphQLString },
  }),
});

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
