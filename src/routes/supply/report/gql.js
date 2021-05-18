import { gql } from "@apollo/client"

export const GET_TABLE_BODY = gql`
    query getTableBody {
        report {
            generalReport {
                data {
                    body,
                    columns
                }
            }
        }
    }
`
