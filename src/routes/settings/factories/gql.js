import { gql } from "@apollo/client";

export const GET_FACTORIES = gql`
query {
  factory {
    factories {
      edges {
        node {
          code,
          createdAt,
          name
        }
      }
    }
  }
}
`;
