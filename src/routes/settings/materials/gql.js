import { gql } from "@apollo/client";

export const PAGINATE_VENDOR_PRODUCTS = gql`
query nextPage($first: Int, $last: Int, $after: String, $before: String) {
  vendor {
    vendorProducts(first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
      edges{
        node{
          id
          createdAt
          price
          vendorFactory{
            paymentCondition
            factory{
              name
            }
            vendor{
              name
            }
          }
          product {
            name
            measure
          }
          productionDayCount
          deliveryDayCount
          currency
          
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
`;

export const GET_PRODUCT_HISTORY = gql`
query getProductHistory($id: ID!) {
  vendor {
    vendorProductsHistory(id: $id) {
      edges {
        node {
          id
          price
          deliveryDayCount
          productionDayCount
          measure
          isActive
          historyDate
          updatedAt
        }
      }
    }
  }
}
`;

export const GET_FACTORIES = gql`
query getFactories {
  factory {
    factories {
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

export const GET_VENDOR_FACTORIES = gql`
query getVendorFactories($factory: ID) {
  vendor {
    vendorFactories(factory: $factory) {
      edges {
        node {
          pk
          vendor {
            name
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCTS = gql`
query getProducts {
  product {
    products {
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

export const CREATE_VENDOR_PRODUCT = gql`
mutation createVendorProduct($input: VendorProductCreateMutationInput!){
  vendor{
    vendorProductCreate(input: $input){
      ok
      errors
      vendorProduct{
        id
      }
    }
  }
}
`;

export const UPDATE_VENDOR_PRODUCT = gql`
mutation updateVendorProduct($input: VendorProductUpdateMutationInput!){
  vendor{
    vendorProductUpdate(input: $input){
      ok
      errors
    }
  }
}
`;

export const GET_VENDOR_PRODUCT = gql`
query getVendorProduct($id: ID!) {
  vendor {
    vendorProduct(id: $id) {
      id
      pk
      currency
      price
      isActive
      vendorFactory {
        pk
        factory {
          pk
        }
      }
      product {
        pk
      }
      deliveryDayCount
      productionDayCount
    }
  }
}
`;

export const GET_VENDOR_PRODUCT_HISTORY = gql`
query getVendorProductHistory($id: String) {
  vendor {
    vendorProductsHistory(id: $id) {
      edges {
        node {
          vendorFactory {
            factory {
              name
            }
            vendor {
              name
            }
          }
          product {
            name
          }
          price
          currency
          productionDayCount
          deliveryDayCount
          updatedAt
          isActive
        }
      }
    }
  }
}
`;
