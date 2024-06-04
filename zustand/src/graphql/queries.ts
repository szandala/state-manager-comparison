// src/graphql/queries.ts
import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 20, channel: "default-channel") {
      edges {
        node {
          id
          name
          thumbnail(size: 100) {
            url
          }
          media {
            type
            url(size: 100)
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(channel: "default-channel", first: 5) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!, $channel: String!) {
    product(id: $id, channel: $channel) {
      id
      name
      description
      thumbnail(size: 500) {
        url
      }
      media {
        type
        url(size: 500)
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
      }
      variants {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION = gql`
  query GetProductsByCollection($collectionId: ID!, $channel: String!) {
    products(
      first: 20
      channel: $channel
      where: { collection: { eq: $collectionId } }
    ) {
      edges {
        node {
          id
          name
          thumbnail(size: 100) {
            url
          }
          media {
            type
            url(size: 100)
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;
