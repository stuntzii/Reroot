import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const getApolloClient = (
  uri: string,
): ApolloClient<NormalizedCacheObject> => new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
