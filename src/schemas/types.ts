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

  type ExtendedMovieResponse {
    title: String!
    imdbUrl: String!
    wikiUrl: String!
    wikiDescription: String!
  }
`;

export default typeDefs;