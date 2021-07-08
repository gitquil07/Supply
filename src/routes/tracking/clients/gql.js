import { gql } from "@apollo/client";

export const GET_TRACKING_CLIENTS = gql`
query MyQuery($fromDate: Date, $toDate: Date) {
    application {
      applications(fromDate: $fromDate, toDate: $toDate) {
        edges {
          node {
            tracking{
              vendor{
                id
                name
                createdAt
                role
                phoneNumber
                sapCity
                sapCountry{
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  
`; 