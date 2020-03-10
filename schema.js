const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

module.exports = gql`
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