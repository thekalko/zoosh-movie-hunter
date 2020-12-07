import  gql  from "graphql-tag";

const typeQuery = gql`
  type Query {
    movies: [Movie!]
    movieSearch(searchValue: String!): [Movie!]
    fetchMovieFromWikipedia(movieId: Int!): ExtendedMovieResponse!
  }
`;

export default typeQuery;