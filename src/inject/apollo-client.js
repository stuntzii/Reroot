import { ApolloClient, InMemoryCache } from "@apollo/client";

import { LENS_API } from "../env";

export const apolloClient = new ApolloClient({
  uri: LENS_API,
  cache: new InMemoryCache()
});
