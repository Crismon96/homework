import { gql } from '@apollo/client';

export const createTimerMutation = gql`
  mutation CreateTimer($timer: TimerCreation!) {
    createTimer(timer: $timer) {
      id
      description
      from
      until
    }
  }
`;
