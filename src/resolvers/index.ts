import { IResolvers } from "graphql-tools";

//queries
import userQueries from "./queries/movieQueries";

//mutations
import userMutations from "./mutations/movieMutations";

//subscription
import userSubscription from "./subscriptions/movieSubscriptions";


export const resolverMap: IResolvers = {
  Mutation: {
    ...userMutations
  },
  Query: {
    ...userQueries
  },
  Subscription: {
    ...userSubscription
  }
};