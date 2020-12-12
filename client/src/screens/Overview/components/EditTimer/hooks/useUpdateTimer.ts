import { useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  GetTimerQuery,
  GetTimerQueryVariables,
  Timer,
  TimerUpdate,
  UpdateTimerMutation,
  UpdateTimerMutationVariables,
} from '../../../../../generated/graphql';
import { getTimerQuery, updateTimerMutation as updateTimerMutationDefinition } from '../queries/editTimer.queries';

export default function useUpdateTimer(id: string) {
  const { data } = useQuery<GetTimerQuery, GetTimerQueryVariables>(getTimerQuery, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  const initialTimerValues = useMemo<Timer>(() => {
    if (data?.timer) {
      const { id: timerId, description, from, until } = data?.timer;
      return {
        id: timerId,
        description,
        from,
        until,
      };
    } else {
      return { id: id, description: '', from: '', until: '' };
    }
  }, [data, id]);

  const [updateTimerMutation, updateTimerMutationResult] = useMutation<
    UpdateTimerMutation,
    UpdateTimerMutationVariables
  >(updateTimerMutationDefinition);

  const updateTimer = async (timerUpdate: TimerUpdate) => {
    try {
      const result = await updateTimerMutation({
        variables: {
          timer: timerUpdate,
        },
      });

      return result;
    } catch (e) {
      console.error('Error when updating Timer: ', e);
    }
  };

  return {
    updateTimer,
    initialTimerValues,
    loading: updateTimerMutationResult.loading,
  };
}
