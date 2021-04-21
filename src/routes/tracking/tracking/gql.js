import { gql } from "@apollo/client";

export const GET_TRACKINGS = gql`
    query MyQuery {
        application {
            applications {
                edges {
                    node {
                        trackingUser {
                            firstName
                            fullName
                        }
                        degreeOfDanger
                        deliveryCondition
                        packageOnPallet
                        transportCount
                        transportType {
                            name
                        }
                        createdAt
                        updatedAt
                        typeOfPackaging
                        publicId
                    }
                }
            }
        }
    }
  
`;