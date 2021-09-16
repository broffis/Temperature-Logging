const resolvers = {
  Query: {
    // returns and array of locations
    locations: (_, __, { dataSources }) => {
      return dataSources.logAPI.getAllLocations();
    },

    // returns an array of fridges
    fridges: (_, __, { dataSources, authToken }) => {
      return dataSources.logAPI.getAllFridges();
    },

    // returns an array of fridges by location id
    fridgesByLocation: (_, { locationId }, { dataSources }) => {
      return dataSources.logAPI.getFridgeByLocation(locationId);
    },

    // returns a single fridge by id
    fridge: (_, { id }, { dataSources }) => {
      return dataSources.logAPI.getFridgeById(id);
    },

    // returns an array of temperature logs
    logs: (_, __, { dataSources }) => {
      return dataSources.logAPI.getAllLogs();
    },
  },

  Fridge: {
    tempLogs: ({ _id }, _, { dataSources }) => {
      return dataSources.logAPI.getLogsByFridgeId(_id);
    },
    location: ({ locationId }, _, { dataSources }) => {
      return dataSources.logAPI.getLocationById(locationId);
    }
  },

  Mutation: {
    // Create a new location
    addLocation: async (_, { name }, { dataSources }) => {
      try {
        const newLocation = await dataSources.logAPI.addLocation(name);
        const locations = dataSources.logAPI.getAllLocations();

        return {
          code: 200,
          success: true,
          message: `Successfully added ${name} to the list of locations`,
          locations
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          locations: null,
        };
      }
    },
    
    // Create a Fridge
    addFridge: async (_, { name, locationId}, { dataSources}) => {
      try {
        const newFridge = await dataSources.logAPI.addFridge({ name, locationId});
        const fridges = dataSources.logAPI.getAllFridges();

        return {
          code: 200,
          success: true,
          message: `Successfully added ${name} to the list of Fridges`,
          fridges
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          fridges: null,
        };
      }
    },

    // Log a fridge temperature
    addFridgeTempLog: async (_, { fridgeId, temperature, logTime }, { dataSources }) => {
      try {
        await dataSources.logAPI.addFridgeTempLog({ fridgeId, temperature, logTime});
        const fridge = await dataSources.logAPI.getFridgeById(fridgeId);
        return {
          code: 200,
          success: true,
          message: `Successfully logged ${temperature} for ${fridge.name} at ${fridge.logTime}`,
          fridge
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          fridge: null,
        };
      }
    },

    // Add a user
    addUser: async (_, { name, email, password, access }, { dataSources }) => {
      try {
        const { token } = await dataSources.logAPI.addUser({ name, email, password, access });
        return {
          code: 200,
          success: true,
          message: `Successfully created ${name}`,
          token
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          token: null
        }
      }
    }
  },
}

module.exports = resolvers