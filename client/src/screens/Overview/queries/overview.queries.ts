import { gql } from '@apollo/client';

export const timerListQuery = gql`
  query timerList($offset: Int!, $limit: Int!, $filter: String) {
    timers(offset: $offset, limit: $limit, filter: $filter) {
      totalCount
      timers {
        id
        description
        from
        until
      }
    }
  }
`;
