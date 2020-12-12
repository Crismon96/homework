import { TableCell } from '@material-ui/core';
import styled from 'styled-components';

export const Main = styled.main`
  margin: 0 4rem;
  padding: 1rem 0 0;
  height: 100vh;
  position: relative;
  overflow: visible !important;
`;

export const SectionContainer = styled.section`
  width: calc(100% - 10rem);
  margin-left: 10rem;
  overflow: hidden;
`;

export const OneLineCell = styled(TableCell)`
  white-space: nowrap;
`;
