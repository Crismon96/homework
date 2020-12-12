import { useMutation } from '@apollo/client';
import { CreateTimerMutation, CreateTimerMutationVariables, TimerCreation } from '../../../generated/graphql';
import { createTimerMutation as createTimerMutationDefinition } from '../queries/timer.queries';

function useCreateTimer() {
  const [createTimerMutation, _] = useMutation<CreateTimerMutation, CreateTimerMutationVariables>(
    createTimerMutationDefinition
  );

  const createTimer = async (timer: TimerCreation) => {
    try {
      const result = await createTimerMutation({
        variables: {
          timer,
        },
      });

      return result;
    } catch (e) {
      console.error('createTimerMutation failed. This is the error: ', e);
    }
  };

  return {
    createTimer,
  };
}
export default useCreateTimer;
