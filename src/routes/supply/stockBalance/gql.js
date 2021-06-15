import { gql } from "@apollo/client";

export const GET_STOCK_BALANCE_TEMPLATE = gql`
query getTemplate {
    core {
        templates {
        stockBalanceTemplate
        }
    }
}
`;

export const CREATE_STOCK_BALANCE_FILE = gql`
mutation stockBalanceFileCreate($input: StockBalanceFileCreateMutationInput!){
  stock{
    stockBalanceFileCreate(input: $input){
      ok
      errors
    }
  }
}`;