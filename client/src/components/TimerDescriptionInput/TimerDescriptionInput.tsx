import React from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';
import { TimerDescriptionInput as TimerDescriptionInputField } from '../../screens/Timer/timer.styles';

type Props = {
  control: UseFormMethods['control'];
  errors: UseFormMethods['errors'];
};

function TimerDescriptionInput({ control, errors }: Props) {
  const maxLength = 200;
  const maxLengthModifier = 10;

  return (
    <Controller
      control={control}
      name="description"
      rules={{
        required: 'This field cannot be empty',
        validate: (value: string) => value?.length <= maxLength || 'The provided description is too long',
      }}
      defaultValue=""
      render={(props) => (
        <TimerDescriptionInputField
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
  );
}

export default TimerDescriptionInput;
