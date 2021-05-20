import { gql } from "@apollo/client";

export const GET_TRACKING_TRANSPORTS = gql`
query getTrackings($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  tracking {
    trackings(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          id
          publicId
          vendor {
            name
          }
          transportNumber
          createdAt
          currency
          amount
          brutto
          netto
          note
        }
      }
    }
  }
}
`;

