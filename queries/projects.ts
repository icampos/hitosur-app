import { gql } from '@apollo/client'

export const AllProjectsQuery = gql`
  query {
    projects {
        name
        address
        location
        startDate
        endDate
        description
        status
        customer {
            name
        }
        collaborators {
         name
        }
        projectType {
            name
        }
    }
  }
`