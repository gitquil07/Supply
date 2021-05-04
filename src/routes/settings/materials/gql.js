import { gql } from "@apollo/client";

export const GET_USERS = gql`
query {
    account {
      users {
        edges {
          node {
            id,
            firstName,
            lastName,
            username,
            phoneNumber,
            role {
              name,
              displayName
            },
            factories {
             edges {
              node {
                code
              }
             }
            },
            isSuperuser,
          }
        }
      }
    }
  } 
`;


export const CREATE_MATERIAL = gql`
mutation ProductCreate($input: ProductCreateMutationInput!) {
  product {
    productCreate(input: $input) {
      ok
      errors
      product {
        id
      }
    }
  }
}
`;
