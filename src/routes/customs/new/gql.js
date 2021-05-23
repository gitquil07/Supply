import { gql } from "@apollo/client";

export const CUSTOMS = gql`
query getCustoms($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
    custom {
      customs(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before) {
        edges {
          node {
            id
            declarant {
              username
            }
            contractor {
              username
            }
            post
            sst
            publicId
            status
            mode
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

export const UPDATE_CUSTOM = gql`
mutation updateVendor($input: CustomUpdateMutationInput!) {
    custom {
      customUpdate(input: $input) {
        ok
        errors
      }
    }
  }
`;

export const GET_CUSTOM = gql`
query getCustom($id: ID!) {
    custom {
      custom(id: $id) {
        pk
        mode
        post
        sst
        registrationAmount
        status
        declarantNote
        contractorNote
      }
    }
  }  
`; 