const { image_search } = require("duckduckgo-images-api");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");
const Plant = require("../models/Plant");

// after break: refactor these resolvers and types into separate files

// imageScraper grabs an image by name
const imageScraper = (query) => {
  return image_search({
    query,
    moderate: true,
  }).then((res) => {
    return res[0]?.thumbnail;
  });
};

// getPlantByName grabs a plant from our database by name pattern using SQL's LIKE operator
const getPlantByName = (name) => {
  return Plant.findByName(name).then((res) => res);
};

// getPlantById grabs a plant from our database by its plantId
const getPlantById = (id) => {
  return Plant.findById(id).then((res) => res);
};

const PlantType = new GraphQLObjectType({
  name: "plant",
  description: "plant template",
  fields: () => ({
    plantId: { type: GraphQLInt },
    image: {
      type: GraphQLString,
      resolve: (parent) => imageScraper(parent.scientificName),
    },
    commonName: { type: GraphQLString },
    synonyms: { type: GraphQLString },
    scientificName: { type: GraphQLString },
    lightRange: { type: GraphQLString },
    hydrationRange: { type: GraphQLString },
    careDifficulty: { type: GraphQLString },
    pestsDiseases: { type: GraphQLString },
    warnings: { type: GraphQLString },
    height: { type: GraphQLString },
    spread: { type: GraphQLString },
    type: { type: GraphQLString },
    floweringPeriod: { type: GraphQLString },
    bloomSize: { type: GraphQLString },
    temperatureRange: { type: GraphQLString },
    placement: { type: GraphQLString },
    substrateRecommendation: { type: GraphQLString },
    pottingNotes: { type: GraphQLString },
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
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
