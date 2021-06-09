import { gql } from "@apollo/client";

export const GET_TRACKING_TRANSPORTS = gql`
query getTrackings($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  tracking {
    trackings(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
      edges {
        node {
          id
          publicId
          vendor {
            name
          }
          application {
            transportType {
              name
            }
            orders {
              edges {
                node {
                  pk
                  vendorFactory {
                    factory {
                      name
                    }
                  }
                }
              }
            }
            transportMix
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


export const GET_TRACKING = gql`
query getTrackingInfo($id: ID!) {
  tracking {
    tracking(id: $id) {
      pk
      publicId
      vendor {
        name
        pk
      }
      transportNumber
      netto
      brutto
      note
      status
      trDate
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
        transportMix
        shippingDate
        files {
          edges {
            node {
              file,
              fileUrl
            }
          }
        }
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
        packageOnPallet
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
                        size
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
            pk
            number
            status
            relativeWeight
          }
        }
      }
    }
  }
}`;

export const INVOICE_UPDATE = gql`
mutation updateInvoice($input: InvoiceUpdateMutationInput!){
  application{
    invoiceUpdate(input: $input){
      ok
      errors
    }
  }
}`;
