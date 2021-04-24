import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`

query {
  application {
    applications {
        edges {
            node {
    		    id,
                status,
                createdAt,
                updatedAt,
                order {
                    vendorFactory {
                        factory {
                            name
                        }
                    }
                },
                order {
                    vendorFactory {
                        vendor {
                            name
                        }
                    }
                }
            }
        } 
    }
  }
}
`;