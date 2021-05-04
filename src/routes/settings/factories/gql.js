import { gql } from "@apollo/client";

export const GET_FACTORIES = gql`
query {
  factory {
    factories {
      edges {
        node {
          id
          pk
          name
          officialName
          code
          position
          createdAt
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
      ok
      errors
      factory {
        id
      }
      query {
        factory {
          factories {
            edges {
              node {
                id
                pk
                name
                officialName
                code
                position
                createdAt
              }
            }
          }
        }
      }
      clientMutationId
    }
  }
}

`;

export const UPDATE_FACTORY = gql`
mutation UPDATE_FACTORY($input: FactoryUpdateMutationInput!) {
  factory {
    factoryUpdate(input: $input) {
      ok
      errors
      factory {
        id
        name
        officialName
        code
        position
      }
    }
  }
}

`;