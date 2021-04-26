import { gql } from "@apollo/client";

export const GET_TRACKINGS = gql`
query MyQuery($fromDate: Date, $toDate: Date) {
    application {
      applications(fromDate: $fromDate, toDate: $toDate) {
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
            order {
              vendorFactory {
                factory {
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