import { gql } from '@apollo/client';

export const getTimerQuery = gql`
  query getTimer($id: ID!) {
    timer(id: $id) {
      id
      description
      from
      until
    }
  }
`;

export const updateTimerMutation = gql`
  mutation updateTimer($timer: TimerUpdate!) {
    updateTimer(timer: $timer) {
      id
      description
      from
      until
    }
  }
`;
