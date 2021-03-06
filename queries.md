### Types:

`PlantType`:
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

`UserPlantType`:
* userPlantId
* plantId
* userId

`CareLogType`:
* ...PlantType
* careLogs

### Queries:

```
{
    plantByName (name: String!) {
        ...PlantType
    }
}
```
Returns a list of plants that match the pattern of the passed string (non-optional argument).

```
{
    plantById (id: Int!) {
      ...PlantType
    }
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

```
removeFromCollection(plantId: Int!, userId: Int!) {
  userPlantId
  plantId
  userId
}
```

Removes a plant from a user's collection by userPlantId and plantId.

```
getMyPlants(userId: Int!) {
  commonName
  image
  plantId
}
```
> Note: more data can be added to this query if needed, as it currently only returns the common name, plant id and image.

Returns all plants in a user's collection, by userId.

```
{
	getMyCareHistoryById(plantId: Int!, userId: Int!) {
    careLogs {
      userPlantLogId
      userId
      plantId
      userPlantId
      careDate
      careType
      careNote
    }
    plantDetails {
      plantId
      image
      commonName
      synonyms
      scientificName
      lightRange
      hydrationRange
      careDifficulty
      pestsDiseases
      warnings
      height
      spread
      type
      floweringPeriod
      bloomSize
      temperatureRange
      placement
      substrateRecommendation
      pottingNotes
      watering
      propagation
    }
  }
}
```
Returns all information for the My Care History page, separated by plantDetails and careLogs. Requires a plantId and userId. 

```
{
  addLogById(userId, plantId) { 
    userId
    plantId
    userPlantId, 
    careDate, 
    careType, 
    careNote
  }
}
```
INSERTS a care log associated to a single plant

```
{
  removeLogByLogId(userPlantId) { 
    userPlantLogId, 
    careDate, 
    careType, 
    careNote
  }
}
```
DELETES a care log associated to a single plant