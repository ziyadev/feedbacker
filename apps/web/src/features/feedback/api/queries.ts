import { gql } from '@/graphql/gql';

export const GET_FEEDBACKS = gql(`
  query GetFeedbacks(
      $filter: GetAllFeedbacksFilterDto
      $pagination: FeedbackPaginationDto
      $orderBy: GetAllFeedbacksFilterOrderBy
  ) {
      getFeedbacks(filter: $filter, pagination: $pagination, orderBy: $orderBy) {
          totalCount
          hasNextPage
          startCursor
          endCursor
          nodes {
              id
              userMetadata {
                  key
                  value
              }
              metadata {
                  key
                  value
              }
              rating
              type
              comment
              priority
              status
              pageUrl
              country
              summary
              createdAt
              updatedAt
          }
      }
  }
  `);
