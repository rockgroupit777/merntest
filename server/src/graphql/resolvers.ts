import { userQueries, userMutation, userSubscription } from "../users";
const rootResolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutation,
  },
  Subscription: {
    ...userSubscription,
  },
};
export default rootResolvers;
