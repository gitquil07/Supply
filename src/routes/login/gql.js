import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
mutation tokenAuth($input: TokenAuthMutationInput!) {
    account {
      tokenAuth(input: $input) {
        payload
        refreshExpiresIn
        ok
        errors
        token
      }
    }
  }    
`;