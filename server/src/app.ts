import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs, resolvers } from "./graphql";

const createApp = () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
  return { app, server };
};
export default createApp;
