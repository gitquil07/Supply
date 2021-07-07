import { gql } from "@apollo/client";

export const CUSTOMS = gql`
query getCustoms($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  custom {
    customs(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, isNew: true, orderBy: "-createdAt") {
      edges {
        node {
          id
          publicId
          mode
          declarantNote
          contractorNote
          createdAt
          invoice {
            application {
              transportType {
                name
              }
              orders {
                edges {
                  node {
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
          pk
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

export const GET_CUSTOM_TEMPLATE = gql`
query getTemplate {
  core {
    templates {
      customsTemplate
    }
  }
}
`;

export const CUSTOM_FILE_CREATE = gql`
mutation customFileCreate($input: CustomFileCreateMutationInput!){
	custom{
    customFileCreate(input: $input){
      ok
      errors
    }
  }  
}`;