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


export const CREATE_USER = gql`
mutation MyMutation($input: UserCreateMutationInput) {
  account {
    userCreate(input: $input) {
      ok
      errors
      user {
        id
      }
    }
  }
}

`;