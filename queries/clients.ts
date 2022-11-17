import { gql } from '@apollo/client'

export const AllClientsQuery = gql`
  query {
    customers {
        id
        name
        lastName
        email
        phone
    }
  }
`

export const ClientQuery = gql`
  query ($id: String){
    customer(id: $id) {
        id
        name
        lastName
        email
        phone
    }
  }
`