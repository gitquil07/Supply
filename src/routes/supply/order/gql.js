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