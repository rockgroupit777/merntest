import { userQueries, userMutation, userSubscription } from "../users";
import { postQueries, postMutation, postSubscription } from "../posts";
const rootResolvers = {
  Query: {
    ...userQueries,
    ...postQueries,
  },
  Mutation: {
    ...userMutation,
    ...postMutation,
  },
  Subscription: {
    ...userSubscription,
    ...postSubscription,
  },
};
export default rootResolvers;
