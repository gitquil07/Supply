import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: 'https://supply-api.artelgroup.org/graphql/'
});

const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) console.log("logout");
})

const authMiddleware = new ApolloLink((operation, forward) => {
    // console.log("operation", operation);
    // console.log("forward", forward);
    const token = localStorage.getItem("supply_token");
    // console.log("token in apollo client", token);

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
    link: concat(authMiddleware, httpLink),
});