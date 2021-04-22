import { gql } from "@apollo/client";

export const GET_TRACKING_CLIENTS = gql`
    query MyQuery {
        application {
        applications {
            edges {
            node {
                trackings {
                edges {
                    node {
                    vendor {
                        id
                        name
                        createdAt
                        role
                        phoneNumber
                        sapCity
                        sapCountry {
                        name
                        }
                    }
                    }
                }
                }
            }
            }
        }
    }
}
  
`; 