import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
query Products {
    product {
      products {
        edges {
          node {
            id
            group {
              name
            }
            measure
            name
            codeTnved
            typeOfPackaging
          }
        }
      }
    }
  }
`;

export const CREATE_PRODUCT_GROUP = gql`
mutation CreateProductGroup($input: ProductGroupCreateMutationInput!) {
  product {
    productGroupCreate(input: $input) {
      ok
      errors
      productGroup {
        pk
      }
    }
  }
}
`;

export const UPDATE_PRODUCT_GROUP = gql`
mutation updateProductGroup($input: ProductGroupUpdateMutationInput!) {
  product {
    productGroupUpdate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: ProductUpdateMutationInput!){
  product{
    productUpdate(input: $input){
      ok
      errors
    }
  }
}
`;

export const CREATE_PRODUCT = gql`
mutation CreateProduct($input: ProductCreateMutationInput!) {
  product {
    productCreate(input: $input) {
      ok
      errors
      product {
        id
      }
    }
  }
}
`;

export const GET_PRODUCT_AND_GROUP = gql`
query GetProduct($id: ID!) {
  product {
    product(id: $id) {
      pk
      name
      code
      codeTnved
      measure
      typeOfPackaging
      group {
        id
        pk
        name
        code
      }
    }
  }
}
`;