import { gql } from '@apollo/client'

export const CreateProjectMutation = gql`
mutation ($name: String!, $startDate: String!, $endDate: String, $address: String!, $typeId: String!, $responsible: String!, $onField: String, $customer: String!, $note: String, $assistant: String, $task: String!) {
  createProject(name: $name, startDate: $startDate, endDate: $endDate, address: $address, typeId: $typeId, responsible: $responsible, onField: $onField, customer: $customer, note: $note, assistant: $assistant, task: $task) {
    name
    startDate
    endDate
    address
    typeId
  }
}
`;

export const UpdateProjectMutation = gql`
mutation ($id: String!, $name: String!, $startDate: String!, $endDate: String, $address: String!, $typeId: String!, $responsible: String!, $onField: String, $customer: String!, $assistant: String) {
  updateProject(id: $id, name: $name, startDate: $startDate, endDate: $endDate, address: $address, typeId: $typeId, responsible: $responsible, onField: $onField, customer: $customer, assistant: $assistant) {
    id
    name
    startDate
    endDate
    address
    typeId
  }
}
`;



export const UpdateProjectStatusMutation = gql`
mutation ($id: String!, $task: String!) {
  updateStatus(id: $id, task: $task) {
    name
    startDate
    endDate
    address
    typeId
    task
  }
}
`;