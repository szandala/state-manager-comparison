// src/graphql/client.ts
import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8000/graphql/";

const client = new GraphQLClient(endpoint);

export const fetchGraphQL = async (query: string, variables = {}) => {
  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};
