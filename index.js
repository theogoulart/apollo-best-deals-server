const { ApolloServer } = require('apollo-server');
const PromobitAPI = require('./datasource/Promobit');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            promobitAPI: new PromobitAPI(),
        };
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});