### Overview

Every `PlantType` query has access to the following fields from our data model:
* plantId 
* image
* commonName
* synonyms
* scientificName
* lightRange
* hydrationRange
* careDifficulty
* pestsDiseases
* warnings
* height
* spread
* type
* floweringPeriod
* bloomSize
* temperatureRange
* placement
* substrateRecommendation
* pottingNotes
* watering
* propagation

### Queries:

```
{
    plantByName (name: String!) {
        ...
    }
}
```
Returns a list of plants that match the pattern of the passed string (non-optional argument).

```
{
    plantById (id: Int!)
}
```

Returns a single plant by id (non-optional argument).

```
{
  addToCollection(userId: Int!, plantId: Int!) {
    userPlantId
    plantId
    userId
  }
}
```
Adds a plant to a user's collection by userId and plantId. 