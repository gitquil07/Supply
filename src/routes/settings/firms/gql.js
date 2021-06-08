import { gql } from "@apollo/client";

export const PAGINATE_FIRMS = gql`
query getFirms($first: Int, $last: Int, $before: String, $after: String) {
  factory {
    firms(first: $first, last: $last, before: $before, after: $after, orderBy: "-createdAt") {
      edges {
        node {
          id
          pk
          name
          inn
          factories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
`;

export const CREATE_FIRM = gql`
mutation createFirm($input: FirmCreateMutationInput!){
    factory{
      firmCreate(input: $input){
        ok
        errors
        query {
          factory{
            firms{
              edges{
                node{
                  id
                  pk
                  name
                  inn
                }
              }
            }
          }
        }
      }
    }
}
`;

export const UPDATE_FIRM = gql`
mutation updateFirm($input: FirmUpdateMutationInput!){
    factory{
      firmUpdate(input: $input){
        ok
        errors
      }
    }
}
`;