import { gql } from "@apollo/client";

export const PAGINATE_TRANSPORT_TYPES = gql`
query getTransports($first: Int, $last: Int, $after: String, $before: String) {
    transport {
      transportTypes(first: $first, last: $last, after: $after, before: $before) {
        edges {
          node {
            id
            pk
            name
            customsDayCount
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
}
`; 

export const CREATE_TRANSPORT_TYPE = gql`
mutation createTransportType($input: TransportTypeCreateMutationInput!){
    transport{
      transportTypeCreate(input: $input){
        ok
        errors
        query{
          transport{
            transportTypes{
              edges{
                node{
                  id
                  pk
                  name
                  customsDayCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_TRANSPORT_TYPE = gql`
mutation updateTransportType($input: TransportTypeUpdateMutationInput!){
    transport{
        transportTypeUpdate(input: $input){
        ok
        errors
        }
    }
}`
;