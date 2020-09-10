import { gql } from "apollo-server-express";
import { userTypeDef } from "../users";
import { postTypeDef } from "../posts";
const rootTypeDefs = gql`
    type Query{}
    type Mutation{}
    type Subscription{}
`;
export default [userTypeDef, postTypeDef];
