import { gql } from '@apollo/client'

export const CreateProjectMutation = gql`
mutation ($name: String!, $startDate: String!, $endDate: String, $address: String!, $typeId: String!, $responsible: String!, $onField: String!, $customer: String!, $note: String, $assistant: String!) {
  createProject(name: $name, startDate: $startDate, endDate: $endDate, address: $address, typeId: $typeId, responsible: $responsible, onField: $onField, customer: $customer, note: $note, assistant: $assistant,) {
    name
    startDate
    endDate
    address
    typeId
  }
}
`;