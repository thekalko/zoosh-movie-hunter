import  gql  from "graphql-tag";

const typeMutation = gql`
  type Mutation {
    createMovie(title: String!, casts: [CastInput], imdbId: String!): Movie!
  }
`;

export default typeMutation;