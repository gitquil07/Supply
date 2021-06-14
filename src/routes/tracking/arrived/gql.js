import { gql } from "@apollo/client";

export const GET_TRACKING_ARRIVINGS = gql`
query getTrackings($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  tracking {
    trackings(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, status: "передано" orderBy: "-createdAt") {
      edges {
        node {
          id
          pk
          publicId
          trDate
          station
          border
          vendor {
            name
            sapCountry {
              name
            }
          }
          application {
            transferredDate
            deliveryCondition
            trackingUser {
              username
            }
            inWayDayCount
            transportType {
              name
            }
            invoices {
              edges {
                node {
                  number
                  relativeWeight
                }
              }
            }
            orders {
              edges {
                node {
                  pk
                  vendorFactory {
                    vendorProducts {
                      edges {
                        node {
                          product {
                            name
                          }
                        }
                      }
                    }
                    factory {
                      name
                      firm {
                        name
                      }
                    }
                  }
                }
              }
            }
            shippingDate
          }
          locations {
            edges {
              node {
                name
              }
            }
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