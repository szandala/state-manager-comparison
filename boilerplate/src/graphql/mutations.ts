import { gql } from "graphql-request";

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    accountRegister(input: { email: $email, password: $password }) {
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        field
        message
      }
    }
  }
`;
