import { IconButton } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import StopIcon from '@material-ui/icons/Stop';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TimerCreation } from '../../generated/graphql';
import useCreateTimer from './hooks/useCreateTimer';
import { TimeDisplay, TimerActionButtons, TimerCard, TimerContainer, TimerDescriptionInput } from './timer.styles';

function Timer() {
  const [isMeassuring, setIsMeassuring] = useState(false);
  const [displayValue, setDisplayValue] = useState('Welcome, press start to track you time.');

  const formHookMethods = useForm();
  const { reset, register, errors, setValue, handleSubmit, control, getValues } = formHookMethods;

  const { createTimer } = useCreateTimer();

  const maxLength = 200;
  const maxLengthModifier = 10;

  const handleStartTimer = () => {
    setIsMeassuring(true);
    setValue('from', new Date().toISOString());
  };

  const handleStopTimer = () => {
    setValue('until', new Date().toISOString());
    setIsMeassuring(false);

    // Send the form directly after stop. This could be improved.
    handleSubmit(submitTimer)();
  };

  const handleResetTimer = () => {
    setIsMeassuring(false);
    reset();
    setDisplayValue('Welcome, press start to track you time.');
  };

  const submitTimer = async (data: TimerCreation) => {
    const timerCreationResult = await createTimer(data);
    if (timerCreationResult) {
      setDisplayValue('Time saved successfully!');

      setTimeout(() => handleResetTimer, 10000);
    } else {
      setDisplayValue('An error occured. Please try again or contact me for support');
    }
    setIsMeassuring(false);
  };

  return (
    <TimerContainer>
      <form>
        <input type="hidden" name="from" ref={register()} />
        <input type="hidden" name="until" ref={register()} />

        <TimerCard>
          <TimeDisplay>
            <h1>{displayValue}</h1>
          </TimeDisplay>

          <Controller
            control={control}
            name="description"
            rules={{
              required: 'This field cannot be empty',
              validate: (value: string) => value?.length <= maxLength || 'The provided description is too long',
            }}
            defaultValue=""
            render={(props) => (
              <TimerDescriptionInput
                {...props}
                label={'timers description'}
                autoFocus
                error={Boolean(errors.description)}
                helperText={
                  errors.description
                    ? errors.description.message
                    : props.value && props.value.length >= maxLength - maxLengthModifier
                    ? `${props.value.length}/${maxLength}`
                    : ''
                }
                InputProps={{ id: 'timerDescription' }}
                inputProps={{ maxLength }}
                InputLabelProps={{ htmlFor: 'timerDescription' }}
              />
            )}
          />

          <TimerActionButtons>
            <IconButton disabled={!isMeassuring}>
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
