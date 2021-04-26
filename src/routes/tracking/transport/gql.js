import { gql } from "@apollo/client";

export const GET_TRACKING_TRANSPORTS = gql`
query MyQuery($fromDate: Date, $toDate: Date) {
  application {
    applications(fromDate: $fromDate, toDate: $toDate) {
      edges {
        node {
          order {
            vendorFactory {
              vendor {
                name
                trackings {
                  edges {
                    node {
                      locations {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      transportNumber
                      createdAt
                      trDate
                      amount
                    }
                  }
                }
              }
            }
            publicId
          }
        }
      }
    }
  }
}
`;