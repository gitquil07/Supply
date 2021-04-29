import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
query {
  order {
    orders {
      edges {
        node {
          publicId,
          vendorFactory {
            vendor {
              name
            }
            factory {
              name
            }
          },
          status,
          invoiceProforma,
          invoiceDate,
          createdAt
        }
      }
    }
  }
}
`;

export const ORDER_CREATE = gql`
mutation ($input: OrderCreateMutationInput!) {
  order {
    orderCreate (input: $input) {
      clientMutationId
      errors
      ok
      order {
        id
        orderItems {
          edges {
            node {
              id
              vendorProduct {
                product {
                  matnr
                  maktx
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
              pk
            }
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
            maktx
            pk
          }
        }
      }
    }
  }
}

`;

