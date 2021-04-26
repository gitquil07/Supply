import { gql } from "@apollo/client";

export const GET_NEW_CUSTOMS = gql`
query MyQuery($fromDate: Date, $toDate: Date) {
    application {
      applications(fromDate: $fromDate, toDate: $toDate) {
        edges {
          node {
            publicId
            degreeOfDanger
            deliveryCondition
            packageOnPallet
            transportCount
            status
            createdAt
            updatedAt
            typeOfPackaging
          }
        }
      }
    }
  }
  
`;