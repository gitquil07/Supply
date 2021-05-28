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


export const GET_TRACKING = gql`
query getTrackingInfo($id: ID!) {
  tracking {
    tracking(id: $id) {
      pk
      vendor {
        name
        pk
      }
      transportNumber
      netto
      brutto
      note
      status
      amount
      currency
      locations{
        edges{
          node{
            name
            createdAt
          }
        }
      }
      application {
        id
        invoices{
          edges{
            node{
              number
            }
          }
        }
        transportType {
          id
          name
        }
        typeOfPackaging
        degreeOfDanger
        count
        createdAt
      }
    }
  }
}
`;

export const GET_APPLICATION_ITEMS_GROUPED_BY_ORDERS = gql`
query getVendorProductsGroupedByOrder($id: ID!) {
  application {
    application(id: $id) {
      orders {
        edges {
          node {
            publicId
            orderItems {
              edges {
                node {
                  applicationItems(application: $id) {
                    edges {
                      node {
                        firm {
                          name
                        }
                        count
                        weight
                        orderItem {
                          vendorProduct {
                            product {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
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


export const UPDATE_TRACKING = gql`
mutation updateTracking($input: TrackingUpdateMutationInput!) {
  tracking {
    trackingUpdate(input: $input) {
      ok
      errors
    }
  }
}`;

export const GET_VENDORS = gql`
query getVendors {
  vendor {
    vendors {
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

export const GET_INVOICES = gql`
query getInvoices($id: ID!) {
  application {
    application(id: $id) { 
      invoices(application: $id) {
        edges {
          node {
            number
          }
        }
      }
    }
  }
}`;
