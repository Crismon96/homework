import { useQuery } from '@apollo/client';
import { Button, Table, TableFooter, TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import { TimerListQuery, TimerListQueryVariables } from '../../generated/graphql';
import OverviewTableBody from './components/OverviewTableBody/OverviewTableBody';
import OverviewTableHeader from './components/OverviewTableHeader/OverviewTableHeader';
import { FilterInput, FullBodyTableContainer } from './overview.styles';
import { timerListQuery } from './queries/overview.queries';

export function Overview() {
  const [activePage, setActivePage] = useState(0);
  const [timersPerPage, setTimersPerPage] = useState(10);
  const [filterString, setFilterString] = useState('');
  const [filterInputValue, setFilterInputValue] = useState('');
  // const [showDashboardDialog, setShowDashboardDialog] = useState(false);

  const { data, loading } = useQuery<TimerListQuery, TimerListQueryVariables>(timerListQuery, {
    fetchPolicy: 'cache-and-network',
    variables: { limit: timersPerPage, offset: activePage * timersPerPage, filter: filterString },
  });

  const lowerCaseFilterString = filterString.toLowerCase();

  const timerList = data?.timers.timers.filter(({ description }) =>
    description?.toLowerCase().includes(lowerCaseFilterString)
  );

  if (!data && loading) {
    // show loading spinner
    return null;
  } else if (data) {
    return (
      <>
        <FullBodyTableContainer>
          <Table size="small" stickyHeader>
            <OverviewTableHeader />
            <OverviewTableBody timers={data?.timers.timers} />
          </Table>
        </FullBodyTableContainer>

        <TableFooter>
          <TablePagination
            count={filterString ? timerList?.length ?? 0 : data.timers.totalCount ?? 0}
            onChangePage={(_, newPage) => setActivePage(newPage)}
            onChangeRowsPerPage={(event) => {
              setTimersPerPage(parseInt(event.target.value, 10));
              setActivePage(0);
            }}
            page={activePage}
            rowsPerPage={timersPerPage}
          />

          {/* A workaround because I dont have time to debounce the input and I only want to filter when the user stops typing */}
          <FilterInput
            value={filterInputValue}
            onChange={(event) => setFilterInputValue(event.target.value)}
            label={'Filter your timer for description'}
            InputProps={{ id: 'timerFilter' }}
            InputLabelProps={{ htmlFor: 'timerFilter' }}
          />
          <Button onClick={() => setFilterString(filterInputValue)}>Search!</Button>
        </TableFooter>
      </>
    );
  } else {
    return null;
  }
}

export default Overview;
