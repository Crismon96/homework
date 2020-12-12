import { TableContainer, TextField } from '@material-ui/core';
import styled from 'styled-components';

export const FullBodyTableContainer = styled(TableContainer)`
  // 10rem (8rem header height + 1rem header bottom margin + 1rem content bottom spacing),
  // 53px height of pagination
  max-height: calc(100vh - 10rem - 53px);
  margin: 0 -1rem;
  width: calc(100% + 2rem);
`;

export const FilterInput = styled(TextField)`
  margin: 5rem;
  width: 25rem;
`;
