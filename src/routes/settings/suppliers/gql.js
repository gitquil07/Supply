import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
query getVendors {
  vendor {
    vendors {
      edges {
        node {
          id
          name
          companyName
          sapCountry {
            name
          }
          sapAccountGroup {
           	name
          }
          phoneNumber
          street
          house
          postcode
          sapOkonkh
          sapCity
        }
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
      sapAccountGroup {
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
      sapSearchCriteria
      sapOkonkh
      sapCity
    }
  }
}
`;