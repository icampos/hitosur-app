import { gql } from '@apollo/client'

export const AllRemindersQuery = gql`
  query {
    reminders {
        title
        description
        date
        status
        assignee{
            name
            lastName
            collaboratorType{
            type
            }
        }
    }
  }`