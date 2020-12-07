import  gql  from "graphql-tag";

const typeQuery = gql`
  type Query {
    movies: [Movie!]
    movieSearch(searchValue: String!): [Movie!]
    fetchMovieFromWikipedia(movieId: Int!): ExtendedMovieResponse!
    findSimularMoviesByCast(castId: Int!): [Movie!]
  }
`;

export default typeQuery;