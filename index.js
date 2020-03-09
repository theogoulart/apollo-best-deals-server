const { ApolloServer, gql } = require('apollo-server');
const PromobitAPI = require('./data_source/Promobit');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Offers {
    id: ID!,
    title: String,
    image: String,
    storeDomain: String!,
    store: Store!,
    userId: Int!,
    user: User!
  }

  type Store {
    id: ID!,
    title: String,
    domain: String,
    image: String
  }

  type User {
    id: ID!,
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    offers: [Offers],
  }
`;

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
    Query: {
        offers: async (_source, _args, { dataSources }) => {
            const offers = await dataSources.promobitAPI.getOffers();
            return offers.map((offer) => {
                return {
                    id: offer.offerId,
                    title: offer.offerTitle,
                    image: offer.offerPhoto,
                    storeDomain: offer.offerFrom,
                    userId: offer.publisherId,
                };
            });
        },
    },
    Offers: {
        user: async (offer, _, { dataSources }) => {
            const user = await dataSources.promobitAPI.getUser(offer.userId);
            return {
                id: user.id,
                name: user.username,
            };
        },
        store: async (offer, _, { dataSources }) => {
            const store = await dataSources.promobitAPI.getStore(offer.storeDomain);
            return {
                id: store.id,
                title: store.pageTitle,
                domain: store.pageFrom,
                image: store.pageImage
            };
        },
    },
  };

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