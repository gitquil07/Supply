import { gql } from "@apollo/client";

export const APPLICATIONS = gql`
query getApplication($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  application {
    applications(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, status: "поступлено", orderBy: "-createdAt") {
      edges {
        node {
          id
          publicId
          pk
          status
          transportType {
            name
          }
          transportCount
          trackingUser {
            username
          }
          createdAt
          count
          shippingDate
          invoices {
            edges {
              node {
                number
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
`;