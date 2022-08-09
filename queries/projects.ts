import { gql } from '@apollo/client'

export const AllProjectsQuery = gql`
  query {
    projects {
        id
        name
        address
        location
        startDate
        endDate
        description
        status
        customer {
            name
            phone
        }
        collaborators {
         name
         collaboratorType{
          type
         }
        }
        projectType {
            type
        }
    }
  }
`

export const ProjectQuery = gql`
  query ($projectId: String){
    project(id: $projectId) {
        id
        name
        address
        location
        startDate
        endDate
        description
        status
        customer {
            name
            phone
        }
        collaborators {
         name
         collaboratorType{
          type
         }
        }
        projectType {
            type
        }
    }
  }
`


export const CurrentWeekProjectsQuery = gql`
  query {
    currentWeekProjects {
        id
        name
        address
        location
        startDate
        endDate
        description
        status
        customer {
            name
            phone
        }
        collaborators {
         name
         lastName
         collaboratorType{
          type
         }
        }
        projectType {
            type
        }
        documents{
          id
          link
          number
        }
    }
  }
`