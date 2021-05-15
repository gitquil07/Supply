import { gql } from "@apollo/client";

export const PAGINATE_VENDOR_FACTORIES = gql`
query getVendorFactories($first: Int, $last: Int, $after: String, $before: String){
  vendor{
    vendorFactories(first: $first, last: $last, after: $after, before: $before){
      edges{
        node{
          id
          vendor{
            name
          }
          factory{
            name
          }
          paymentCondition
          partnerStartDate
          isActive
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

export const GET_VENDOR_FACTORY = gql`
query getVendorFactory($id: ID!){
    vendor{
      vendorFactory(id: $id){
        pk
        factory{
          pk
          name
        }
        vendor{
          pk
          name
        }
        paymentCondition
        partnerStartDate
        isActive
      }
    }
  }
`;

export const CREATE_VENDOR_FACTORY = gql`
mutation createVendorFactory($input: VendorFactoryCreateMutationInput!){
    vendor{
      vendorFactoryCreate(input: $input){
        ok
        errors
      }
    }
  }
`;

export const UPDATE_VENDOR_FACTORY = gql`
mutation createVendorFactory($input: VendorFactoryUpdateMutationInput!){
    vendor{
      vendorFactoryUpdate(input: $input){
        ok
        errors
      }
    }
  }
`;


export const GET_VENDOR_DEPENDENT_PRODUCT = gql`
query getDependedMaterials($vendorFactory: ID) {
  vendor {
    vendorProducts(vendorFactory: $vendorFactory) {
      edges {
        node {
          vendorFactory {
            factory {
              name
            }
          }
          product {
            name
          }
          price
          deliveryDayCount
          productionDayCount
          updatedAt
        }
      }
    }
  }
}
`;