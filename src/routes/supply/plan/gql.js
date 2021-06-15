import { gql } from "@apollo/client";

export const GET_PLAN_PRODUCT = gql`
query getTemplate {
    core {
      templates {
        planProductTemplate
      }
    }
  }
`;

export const CREATE_PLAN_PRODUCT_FILE = gql`
mutation planProductFileCreate($input: PlanProductFileCreateMutationInput!) {
  stock {
    planProductFileCreate (input: $input){
      ok
      errors
    }
  }
}
`;