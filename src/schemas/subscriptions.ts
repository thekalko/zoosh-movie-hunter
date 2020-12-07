import  gql  from "graphql-tag";

const typeSubscription = gql`
  type Subscription {
    movies: [Movie!]
  }
`;

export default typeSubscription;