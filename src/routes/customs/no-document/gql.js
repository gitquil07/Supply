import { gql } from "@apollo/client";

export const NO_DOCUMENT_CUSTOMS = gql`
query getCustoms($fromDate: Date, $toDate: Date, $first: Int, $last: Int, $after: String, $before: String) {
  custom {
    customs(fromDate: $fromDate, toDate: $toDate, first: $first, last: $last, after: $after, before: $before, status: "нет документов", orderBy: "-createdAt") {
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
              orders{
                edges{
                  node{
                    vendorFactory{
                      vendor{
                        companyName
                      }
                      factory{
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