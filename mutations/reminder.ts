import { gql } from '@apollo/client'

export const CreateReminderMutation = gql`
mutation ($title: String!, $description: String! $date: String!, $status: String!, $assignee: String!) {
  createReminder(title: $title, description: $description, date: $date, status: $status, assignee: $assignee) {
    title
    date
  }
}
`;