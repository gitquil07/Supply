import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
mutation tokenAuth($input: TokenAuthMutationInput!, $username: String!) {
    account {
      tokenAuth(input: $input) {
        payload
        refreshExpiresIn
        ok
        errors
        token
        query {
          account {
            users(username: $username) {
              edges {
                node {
                  role {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }    
`;

export const GET_USER = gql`
query getUser($username: String!) {
  account {
    users(username: $username) {
      edges {
        node {
          role {
            name
          }
        }
      }
    }
  }
}
`;