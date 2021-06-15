import { gql } from "@apollo/client";

export const PAGINATE_FACTORIES = gql`
query nextPage($first: Int, $last: Int, $after: String, $before: String) {
  factory {
    factories(first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
      edges {
        node {
          id
          pk
          name
          firm{
            pk
            name
          }
          code
          position
          createdAt
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
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

export const GET_FIRMS = gql`
query getFrims {
  factory {
    firms {
      edges {
        node {
          pk
          name
        }
      }
    }
  }
}`;