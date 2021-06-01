import { gql } from "@apollo/client";

export const APPLICATIONS = gql`
query getApplication($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  application {
    applications(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, status: "поступлено", orderBy: "-createdAt") {
      edges {
        node {
          id
          publicId
          status
          transportType {
            name
          }
          trackingUser {
            firstName
            lastName
          }
          typeOfPackaging
          createdAt
          count
          shippingDate
          isActive
          transportMix
          deliveryCondition
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