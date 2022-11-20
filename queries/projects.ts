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
        notes{
          id
          note
          date
        }
        task
    }
  }
`

export const ProjectQuery = gql`
  query ($id: String){
    project(id: $id) {
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
        notes{
          id
          note
          date
        }
        task
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
        notes{
          note
          date
        }
    }
  }
`