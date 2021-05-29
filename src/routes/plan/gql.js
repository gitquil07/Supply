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