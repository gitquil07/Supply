import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: 'http://supply-api.artelgroup.org/graphql/'
});

const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) {
        localStorage.removeItem("supply_token");
    }
})

const authMiddleware = new ApolloLink((operation, forward) => {

    const token = localStorage.getItem("supply_token");

    if(token != null){
        operation.setContext({
            headers: {
                Authorization: `JWT ${token}`    
            }
        });
    }


    return forward(operation);
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink, logoutLink),
});