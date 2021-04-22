import { gql } from "@apollo/client";

export const GET_TRACKING_DEPTS = gql`
query MyQuery {
    finance {
      payments {
        edges {
          node {
            factory {
              name
              payments {
                edges {
                  node {
                    price
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