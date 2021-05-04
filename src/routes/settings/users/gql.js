import { gql } from "@apollo/client";

export const GET_USERS = gql`
query {
    account {
      users {
        edges {
          node {
            id,
            pk,
            firstName,
            lastName,
            username,
            phoneNumber,
            email,
            role {
              name,
              displayName
            },
            factories {
             edges {
              node {
                name
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
mutation MyMutation($input: UserCreateMutationInput!) {
  account {
    userCreate(input: $input) {
      ok
      errors
      user {
        id
      }
      query {
        account {
          users {
            edges {
              node {
                id
                password
                username
                email
                role {
                  pk
                  name
                  displayName
                }
                lastName
                firstName
                username
                factories {
                  edges {
                    node{
                      pk
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
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($input: UserUpdateMutationInput!){
  account{
    userUpdate(input: $input){
      ok
      errors
      user{
        id
        pk
        firstName
        lastName
        username
        email
        password
        phoneNumber
        role {
          name,
        }
        factories{
          edges{
            node{
              pk
              name
            }
          }
        }
      }
    }
  }
}
`;

export const GET_FACTORIES = gql`
query GetFactories {
  factory {
    factories {
      edges {
        node {
          pk
          name
        }
      }
    }
  }
}
`;
