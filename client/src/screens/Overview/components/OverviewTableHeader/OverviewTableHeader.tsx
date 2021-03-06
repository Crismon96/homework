import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

function OverviewTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Description</TableCell>
        <TableCell>From</TableCell>
        <TableCell>Until</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default OverviewTableHeader;
