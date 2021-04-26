import { gql } from "@apollo/client";

export const GET_READY_CUSTOMS = gql`
query MyQuery($fromDate: Date, $toDate: Date) {
    application {
      applications(fromDate: $fromDate, toDate: $toDate) {
        edges {
          node {
            publicId
            status
            invoices {
              edges {
                node {
                  number
                }
              }
            }
            createdAt
            transportType {
              name
            }
          }
        }
      }
    }
  }
`;