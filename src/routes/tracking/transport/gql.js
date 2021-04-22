import { gql } from "@apollo/client";

export const GET_TRACKING_TRASNPORTS = gql`
query MyQuery {
    application {
      applications {
        edges {
          node {
            order {
              vendorFactory {
                vendor {
                  name
                  trackings {
                    edges {
                      node {
                        locations {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                        transportNumber
                        createdAt
                        trDate
                        amount
                      }
                    }
                  }
                }
              }
              publicId
            }
          }
        }
      }
    }
  }
  
`;