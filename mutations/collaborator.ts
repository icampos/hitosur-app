import { gql } from '@apollo/client'

export const CreateCollaboratorMutation = gql`
mutation ($name: String!, $lastName: String! $phone: String!, $email: String!, $address: String!) {
  createCollaborator(name: $name, lastName: $lastName, phone: $phone, email: $email, address: $address) {
    name
    lastName
    phone
    email
    address
  }
}
`;