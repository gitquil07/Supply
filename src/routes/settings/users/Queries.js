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