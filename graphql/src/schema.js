const { gql } = require('apollo-server');
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require('graphql-iso-date');

const typeDefs = gql`
  type Query {
    "Query to get locations"
    locations: [Location!]!
    "Fetch all fridges"
    fridges: [Fridge!]!
    "Fetch fridges by locationId"
    fridgesByLocation(locationId: ID!): [Fridge!]!
    "Fetch fridge by id"
    fridge(id: ID!): Fridge!
    "Fetch all logs"
    logs: [Log]
  }

  "A location is a place a fridge can be tied to"
  type Location {
    _id: ID!
    "The location's name"
    location: String!
  }

  "A fridge is a single unit within a location"
  type Fridge {
    _id: ID!
    "The name of the fridge"
    name: String!
    "ID for the location of the fridge. References id in Location"
    locationId: ID!
    "location name of the fridge"
    location: Location!
    tempLogs: [Log]
  }

  type Log {
    _id: ID!
    "Id of the fridge"
    fridgeId: ID!
    "Logged temperature"
    temperature: Int!
    "Time log was entered. Returned in JS DateTimeZ format"
    logTime: String!
  }

  type Mutation {
    "Add a location"
    addLocation(name: String!): AddLocationResponse!
    "Add a fridge. Must pass in locationId and name"
    addFridge(name: String!, locationId: ID!): AddFridgeResponse!
    "Log Fridge Temp"
    addFridgeTempLog(fridgeId: ID!, temperature: Int!, logTime: String): AddFridgeTempLogResponse!
  }

  type AddLocationResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    locations: [Location]
  }

  type AddFridgeResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    fridges: [Fridge]
  }

  type AddFridgeTempLogResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    fridge: Fridge
  }
`;

module.exports = typeDefs;
