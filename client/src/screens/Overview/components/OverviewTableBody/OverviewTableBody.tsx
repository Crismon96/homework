import { IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Timer } from '../../../../generated/graphql';
import { OneLineCell } from '../../../../utils/appStyles.styles';

type Props = {
  timers: Timer[];
};

function OverviewTableBody({ timers }: Props) {
  const history = useHistory();
  const [selectedDashboardIdInDialog, setSelectedDashboardIdInDialog] = useState<string | null>();

  return (
    <TableBody>
      {timers.length ? (
        timers.map((singleTimer) => (
          <TableRow key={singleTimer.id} hover>
            <TableCell>{singleTimer.description}</TableCell>

            <OneLineCell align="right">
              <IconButton size="medium" aria-label="Delete" title="Delete" disabled>
                <Delete fontSize="small" />
              </IconButton>

              <IconButton size="medium" color="primary" aria-label="Edit" title="Edit">
                <Settings fontSize="small" />
              </IconButton>
            </OneLineCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4}>{'No Timers found. Please create a timer to display it here'}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default OverviewTableBody;
