import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getApolloClient = (uri) =>
  new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
