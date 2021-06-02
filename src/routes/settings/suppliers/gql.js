import { gql } from "@apollo/client";

export const PAGINATE_VENDORS = gql`
query nextPage($first: Int, $last: Int, $after: String, $before: String) {
  vendor {
    vendors(first: $first, last: $last, after: $after, before: $before, orderBy: "-createdAt") {
      edges {
        node {
          id
          name
          companyName
          sapCountry {
            name
          }
          phoneNumber
          street
          house
          postcode
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
}

`;

export const GET_SAP_COUNTRIES = gql`
query MyQuery {
  sap {
    sapCountries {
      edges {
        node {
          pk
          name
        }
      }
    }
  }
}
`;

// export const GET_SAP_ACCOUNTS = gql`
// query getAccountGroups{
//   vendor {
//     vendors {
//       edges {
//         node {
//           sapAccountGroup {
//             name
//             pk
//           }
//         }
//       }
//     }
//   }
// }
// `;

export const CREATE_VENDOR = gql`
mutation createVendor($input: VendorCreateMutationInput!) {
  vendor {
    vendorCreate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const UPDATE_VENDOR = gql`
mutation updateVendor($input: VendorUpdateMutationInput!) {
  vendor {
    vendorUpdate(input: $input) {
      ok
      errors
    }
  }
}
`;

export const GET_VENDOR = gql`
query getVendor($id: ID!) {
  vendor {
    vendor(id: $id) {
      pk
      sapCountry {
        pk
      }
      name
      companyName
      phoneNumber
      street
      house
      role
      email
      postcode
    }
  }
}
`;