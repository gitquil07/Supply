import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://10.35.84.119:8000/graphql/',
    cache: new InMemoryCache()
});