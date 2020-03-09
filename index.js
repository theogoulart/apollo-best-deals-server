const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Offers {
    id: ID!,
    title: String,
    image: String,
    storeId: Int!,
    store: Store!,
    userId: Int!
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

const offers = [
    {
        id: 1,
        title: 'iPhone 8 Plus 64GB iOS Tela 5,5" 4G Wi-Fi - Apple',
        image: 'https//i.promobit.com.br/90/879590993515200112444145313567.jpg',
        storeId: 1,
        userId: 1
    },
    {
        id: 2,
        title: 'Processador AMD Ryzen 3 3200G Wraith Stealth',
        image: 'https//i.promobit.com.br/90/564564112515748727453843649514.jpg',
        storeId: 2,
        userId: 2
    },
];

const stores = [
    {
        id: 1,
        title: 'Americanas',
        domain: 'americanas.com.br',
        image: 'https://www.promobit.com.br/static/p/85/120902604915018501849673458767.png'
    },
    {
        id: 2,
        title: 'Amazon',
        domain: 'amazon.com.br',
        image: 'https://www.promobit.com.br/static/p/85/111540649414954772451589872051.png'
    },
];

const users = [
    {
        id: 1,
        name: 'Promobiter'
    },
    {
        id: 2,
        name: 'Theo'
    },
];

  // Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
    Query: {
        offers: () => offers,
    },
    Offers: {
        user: (offer) => {
            return users.find((user) => user.id === offer.userId);
        },
        store: (offer) => {
            return stores.find((store) => store.id === offer.storeId);
        },
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});