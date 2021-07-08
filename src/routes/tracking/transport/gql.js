import { gql } from "@apollo/client";

export const GET_TRACKING_TRANSPORTS = gql`
query getTrackings($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  tracking {
    trackings(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
      edges {
        node {
          id
          pk
          publicId
          status
          trDate
          station
          border
          note
          vendor {
            companyName
            sapCountry {
              name
            }
            sapCity
          }
          application {
            transferredDate
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
                  deliveryCondition
                  destination
                }
              }
            }
            orders {
              edges {
                node {
                  pk
                  orderItems {
                    edges {
                      node {
                        vendorProduct {
                          product {
                            name
                          }
                        }
                      }
                    }
                  }                        
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
                    vendor {
                      sapCountry {
                        name
                      }
                      sapCity
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
        companyName
        pk
      }
      transportNumber
      amount
      brutto
      netto
      station
      status
      trDate
      currency
      locations{
        edges{
          node{
            name
            locationDate
            status
          }
        }
      }
      application {
        id
        pk
        transportMix
        inWayDayCount
        shippingDate
        files {
          edges {
            node {
              file,
              fileUrl
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
            vendorFactory{
              vendor{
                sapCountry{
                  name
                }    
                sapCity
              }
            }
            orderItems {
              edges {
                node {
                  applicationItems(application: $id, userTracking: true) {
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
          companyName
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
            brutto
            netto
            amount
            deliveryCondition
            destination
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

export const UPDATE_APPLICATION = gql`
mutation updateApplicationDate($input: ApplicationUpdateMutationInput!) {
  application {
    applicationUpdate(input: $input) {
      ok
      errors
    }
  }
}
`;
