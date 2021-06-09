import { gql } from "@apollo/client";

export const PAGINATE_USERS = gql`
query nextPage($first: Int, $last: Int, $after: String, $before: String) {
  account {
      users (first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt", isActive: true){
        edges {
          node {
            id,
            pk,
            firstName,
            lastName,
            username,
            phoneNumber,
            email,
            isActive,
            role {
              name,
              displayName
            },
            createdAt
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
        pageInfo {
          endCursor
          startCursor
          hasPreviousPage
          hasNextPage
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


export const GET_ROLES = gql`
query getRoles {
  account {
    roles {
      edges {
        node {
          pk
          displayName
        }
      }
    }
  }
}
`;
