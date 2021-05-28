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
