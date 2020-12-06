import  gql  from "graphql-tag";

const typeQuery = gql`
  type Query {
    movies: [Movie!]
    movieSearch(searchValue: String!): [Movie!]
  }
`;

export default typeQuery;