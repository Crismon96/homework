import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TimerDescriptionInput from '../../../../components/TimerDescriptionInput/TimerDescriptionInput';
import { Timer, TimerUpdate } from '../../../../generated/graphql';
import useUpdateTimer from './hooks/useUpdateTimer';

interface Props {
  id: string;
  handleDialogClose: () => void;
}

function EditTimer({ id, handleDialogClose }: Props) {
  const { initialTimerValues, loading, updateTimer } = useUpdateTimer(id);
  const formHookMethods = useForm<Timer>();
  const { reset, handleSubmit, errors, control } = formHookMethods;

  useEffect(() => {
    if (initialTimerValues?.description !== '') {
      reset(initialTimerValues);
    }
    // The form needs to be reset only when the request returns data. Linting is disabled since this is only wanted in that usecase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTimerValues]);

  const handleSubmitData = async (data: TimerUpdate) => {
    const result = await updateTimer(data);

    if (result?.data?.updateTimer.__typename === 'Timer') {
      handleDialogClose();
    }
  };

  return (
    <form>
      <DialogTitle>Update your timer</DialogTitle>
      <DialogContent>
        <input type="hidden" name="id" ref={formHookMethods.register} />
        <input type="hidden" name="from" ref={formHookMethods.register} />
        <input type="hidden" name="until" ref={formHookMethods.register} />

        <TimerDescriptionInput control={control} errors={errors} />

        <Divider orientation="horizontal" variant="middle" flexItem />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Close
        </Button>

        <Button
          onClick={handleSubmit(handleSubmitData)}
          color="primary"
          disabled={Object.keys(errors).length > 0 || loading}
        >
          {loading && <CircularProgress />}
          Update Timer
        </Button>
      </DialogActions>
    </form>
  );
}

export default EditTimer;
