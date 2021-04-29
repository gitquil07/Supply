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

export const CREATE_FACTORY = gql`
mutation MyMutation($input: FactoryCreateMutationInput!) {
  factory {
    factoryCreate(input: $input) {
      ok,
      errors,
      factory {
        id
      },
      clientMutationId
    }
  }
}
`;