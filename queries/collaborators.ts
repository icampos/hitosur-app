import { gql } from '@apollo/client'


export const AllCollaboratorsQuery = gql`
  query {
    collaborator {
        id
        name
        lastName
        collaboratorType{
          type
         }
    }
  }
`