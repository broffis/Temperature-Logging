require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const LogAPI = require('./datasources/log-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      logAPI: new LogAPI(),
    }
  },
  context: ({ req }) => {
    // console.log('req', req.headers)

    return {
      authToken: req.headers['x-auth-token']
    }    
  },
  
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
})