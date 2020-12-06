import  gql  from "graphql-tag";

const typeQuery = gql`
  type Query {
    movies: [Movie!]
  }
`;

export default typeQuery;