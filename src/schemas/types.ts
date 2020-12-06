import  gql  from "graphql-tag";

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    imdbId: String!
    casts: [Cast!]
  }

  type Cast {
    id: Int!
    name: String!
    movies: [Movie!]
  }

  input CastInput {
    name: String!
  }
`;

export default typeDefs;