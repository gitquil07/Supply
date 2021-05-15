import { gql } from "@apollo/client";

export const ORDERS = gql`
query getOrders($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $before: String, $after: String) {
  order {
    orders(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, before: $before, after: $after) {
      edges {
        node {
          publicId
          id
          status
          invoiceDate
          invoiceProforma
          createdAt
          vendorFactory {
            vendor{
              name
            }
            factory{
              name
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

export const ORDER_CREATE = gql`
mutation createOrder($input: OrderCreateMutationInput!) {
  order {
    orderCreate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const ORDER_UPDATE = gql`
mutation updateOrder($input: OrderUpdateMutationInput!) {
  order {
    orderUpdate(input: $input) {
      ok
      errors
    }
  }
}
`;


export const GET_FACTORIES_LIST = gql`
query MyQuery {
  factory {
    factories {
      edges {
        node {
          name
          pk
        }
      }
    }
  }
}
`;

export const GET_VENDOR_FACTORIES = gql`
  query MyQuery($factory: ID) {
    vendor {
      vendorFactories(factory: $factory) {
        edges {
          node {
            vendor {
              name
            }
            pk
          }
        }
      }
    }
  }
`;

export const GET_VENDOR_FACTORY_PRODUCTS = gql`
query MyQuery($vendorFactory : ID) {
  vendor {
    vendorProducts(vendorFactory: $vendorFactory) {
      edges {
        node {
          product {
            name
          }
          pk
        }
      }
    }
  }
}
`;


export const GET_ORDER = gql`
query getOrder($id: ID!){
  order{
		order(id: $id){
      pk
      vendorFactory{
        pk
        factory {
          pk
          name
        }
      }
      status
      invoiceDate
      invoiceProforma
      orderItems{
        edges{
          node{
            vendorProduct{
              pk
              product{
                name
              }
            }
            count
            dateOfDelivery
            price
            currency
            productionDayCount
          }
        }
      }
    }
  }
}
`;
