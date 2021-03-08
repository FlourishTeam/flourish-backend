const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const { imageScraper } = require("../resolvers/plant-resolvers");

module.exports = new GraphQLObjectType({
  name: "Plant",
  description: "Default plant template",
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
