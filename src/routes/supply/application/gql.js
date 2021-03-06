import { gql } from "@apollo/client";

export const APPLICATIONS = gql`
query getApplication($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  application {
    applications(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
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

export const GET_ORDERS = gql`
query getOrders {
  order {
    orders {
      edges {
        node {
          pk
          publicId
          vendorFactory {
            vendor {
              companyName
            }
            factory {
              name
            }
          } 
        }
      }
    }
  }
}
`;

export const GET_TRANSPORT_TYPES = gql`
query getTransportTypes {
  transport {
    transportTypes {
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

// export const GET_TRACKING_USER = gql`
// query getTrackingUser {
//   account {
//     role(id: "Um9sZU5vZGU6NQ==") {
//       pk
//       displayName
//     }
//   }
// }
// `;

export const GET_APPLICATION = gql`
query getApplication($id : ID!){
  application{
    application(id: $id){
      pk
      files {
        edges {
          node {
            file,
            fileUrl
          }
        }
      }
      orders{
        edges{
          node{
            pk
            publicId
          }
        }
      }
      trackingUser{
        pk
      }
      transportType{
        pk
      }
      applicationItems{
        edges{
          node{
            orderItem{
              order{
                pk
              }
              pk
              requiredCount
            }
            firm{
              pk
            }
            invoice{
              pk
            }
            count
            weight
            size
            invoicePrice
            trackingUser{
              pk
            }
          }
        }
      }
      degreeOfDanger
      packageOnPallet
      transportCount
      shippingDate,
      transportMix
    }
  }
}
`;

export const CREATE_APPLICATION = gql`
mutation createApplication($input: ApplicationCreateMutationInput!) {
  application {
    applicationCreate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const UPDATE_APPLICATION = gql`
mutation updateApplication($input: ApplicationUpdateMutationInput!) {
  application {
    applicationUpdate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const GET_ORDER_ITEMS = gql`
query getOrderItems($orders: [ID]!) {
  order {
    orderItems(orders: $orders) {
      edges {
        node {
          pk
          vendorProduct {
            product {
              name
              measure
            }
          }
          requiredCount
        }
      }
    }
  }
}
`;

export const GET_FIRMS = gql`
query getFirms {
  factory {
    firms {
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
    invoices(application: $id) {
      edges {
        node {
          id
          pk
          number
          netto
          brutto
        }
      }
    }
  }
}
`;

export const CREATE_INVOICE = gql`
mutation invoiceCreate($input: InvoiceCreateMutationInput!, $id: ID) {
  application {
    invoiceCreate(input: $input) {
      ok
      errors
      query {
        application {
          invoices(application: $id) {
            edges {
              node {
                id
                pk
                number
              }
            }
          }
        }
      }
    }
  }
}
`;

export const UPDATE_INVOICE = gql`
mutation updateInvoice($input: InvoiceUpdateMutationInput!, $id: ID!) {
  application {
    invoiceUpdate(input: $input) {
      ok
      errors
      query {
        application {
          invoices(application: $id){
            edges{
              node{
                id
                pk
                number
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_TRACKING_USER = gql`
query getTrackingUsers {
  account {
    users(role: "Um9sZU5vZGU6NQ==") {
      edges {
        node {
          pk
          username
        }
      }
    }
  }
}
`;

export const GET_MIX_TRACKING_USER = gql`
query getMixTrackingUser {
  account {
    users(role: "Um9sZU5vZGU6MTA=") {
      edges {
        node {
          pk
          username
        }
      }
    }
  }
}
`;