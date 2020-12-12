import { IconButton } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import StopIcon from '@material-ui/icons/Stop';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TimerDescriptionInput from '../../components/TimerDescriptionInput/TimerDescriptionInput';
import { TimerCreation } from '../../generated/graphql';
import { formatTimeToView } from '../../utils/times';
import useCreateTimer from './hooks/useCreateTimer';
import { TimeDisplay, TimerActionButtons, TimerCard, TimerContainer } from './timer.styles';

function Timer() {
  const [isMeassuring, setIsMeassuring] = useState(false);
  const [displayValue, setDisplayValue] = useState('Welcome, press start to track you time.');
  const [recordedTime, setRecordedTime] = useState(0);
  const secondsRecorded = useRef<number>(0);
  const secondsIntervall = useRef<number>();

  const formHookMethods = useForm();
  const { reset, register, errors, setValue, handleSubmit, control, trigger } = formHookMethods;

  const { createTimer } = useCreateTimer();

  const hasErrors = Object.keys(errors).length > 0;

  const handleStartTimer = () => {
    setIsMeassuring(true);
    setValue('from', new Date().toISOString());
    secondsIntervall.current = setInterval(() => {
      secondsRecorded.current++;
      setRecordedTime(secondsRecorded.current);
    }, 1000);
  };

  const handleStopTimer = async () => {
    setValue('until', new Date().toISOString());

    // Send the form directly after stop. This could be improved.
    handleSubmit(submitTimer)();
    const isValid = await trigger();
    if (isValid) {
      setIsMeassuring(false);
    }
  };

  const handleResetTimer = () => {
    clearInterval(secondsIntervall.current);
    secondsRecorded.current = 0;

    reset();

    setIsMeassuring(false);
    setDisplayValue('Welcome, press start to track you time.');
  };

  const submitTimer = async (data: TimerCreation) => {
    const timerCreationResult = await createTimer(data);
    if (timerCreationResult) {
      setDisplayValue('Time saved successfully!');
    } else {
      setDisplayValue('An error occured. Please try again or contact me for support');
    }
    setIsMeassuring(false);
  };

  useEffect(() => {
    return () => {
      clearInterval(secondsIntervall.current);
    };
    // this should only run on unmount and not if the dependency changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimerContainer>
      <form>
        <input type="hidden" name="from" ref={register()} />
        <input type="hidden" name="until" ref={register()} />

        <TimerCard>
          <TimeDisplay>
            <h1>{isMeassuring ? formatTimeToView(recordedTime) : displayValue}</h1>
          </TimeDisplay>

          <TimerDescriptionInput control={control} errors={errors} />

          <TimerActionButtons>
            <IconButton disabled={!isMeassuring || hasErrors}>
              <StopIcon fontSize="large" onClick={handleStopTimer} />
            </IconButton>

            <IconButton disabled={isMeassuring}>
              <PlayCircleOutlineIcon fontSize="large" onClick={handleStartTimer} />
            </IconButton>

            <IconButton>
              <ReplayIcon fontSize="large" onClick={handleResetTimer} />
            </IconButton>
          </TimerActionButtons>
        </TimerCard>
      </form>
    </TimerContainer>
  );
}

export default Timer;
