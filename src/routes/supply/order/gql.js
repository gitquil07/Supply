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

export const GET_FACTORIES = gql`
query MyQuery {
  factory {
    factories {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
`;

export const GET_SELECT_OPTIONS = gql`
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
  vendor {
    vendors {
      edges {
        node {
          name
          pk
        }
      }
    }
  }
  product {
    products {
      edges {
        node {
          maktx
          pk
        }
      }
    }
  }
}

`;