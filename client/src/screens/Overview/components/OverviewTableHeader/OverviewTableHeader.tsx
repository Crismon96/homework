import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

function OverviewTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Description</TableCell>
        <TableCell>Actions</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default OverviewTableHeader;
