import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

export const BASE_URL = "http://localhost:8000/";

export const apolloClient = new ApolloClient({
    uri: BASE_URL+"graphql/",
    cache: new InMemoryCache()
});