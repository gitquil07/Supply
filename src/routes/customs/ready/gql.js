import { gql } from "@apollo/client";

export const GET_READY_CUSTOMS = gql`
query MyQuery {
    application {
    applications {
        edges {
        node {
            order {
            vendorFactory {
                vendor {
                trackings {
                    edges {
                    node {
                        publicId
                        vendor {
                        name
                        updatedAt
                        }
                        location
                        transportNumber
                        createdAt
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
}
`;