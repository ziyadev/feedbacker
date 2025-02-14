import { GET_FEEDBACKS } from '@/features/feedback/api/queries';
import { GetFeedbacksQuery } from '@/graphql/graphql';
import {
  FeedbackPaginationDto,
  GetAllFeedbacksFilterDto,
  GetAllFeedbacksFilterOrderBy,
  InputMaybe,
} from '@/graphql/types';
import { MutationHookOptions, useQuery } from '@apollo/client';

const feedbackService = {
  getAll: {
    useQuery: (
      options?: MutationHookOptions<
        GetFeedbacksQuery,
        {
          filter?: InputMaybe<GetAllFeedbacksFilterDto>;
          pagination?: InputMaybe<FeedbackPaginationDto>;
          orderBy?: InputMaybe<GetAllFeedbacksFilterOrderBy>;
        }
      >
    ) => useQuery(GET_FEEDBACKS, options),
  },
};

export default feedbackService;
