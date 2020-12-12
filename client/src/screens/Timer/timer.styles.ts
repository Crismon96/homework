import { Card, TextField } from '@material-ui/core';
import styled from 'styled-components';

export const TimerContainer = styled.div`
  display: grid;
  height: 100%;
  place-items: center;
`;

export const TimerCard = styled(Card)`
  padding: 10rem 15rem;
`;

export const TimeDisplay = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

export const TimerDescriptionInput = styled(TextField)`
  width: 100%;
  height: 4.375rem;

  .Mui-error {
    text-align: left;
  }
`;

export const TimerActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;
