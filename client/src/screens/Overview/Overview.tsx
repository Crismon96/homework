import { useQuery } from '@apollo/client';
import { Table } from '@material-ui/core';
import React, { useState } from 'react';
import { TimerListQuery, TimerListQueryVariables } from '../../generated/graphql';
import OverviewTableBody from './components/OverviewTableBody/OverviewTableBody';
import OverviewTableHeader from './components/OverviewTableHeader/OverviewTableHeader';
import { FullBodyTableContainer } from './overview.styles';
import { timerListQuery } from './queries/overview.queries';

export function Overview() {
  const [activePage, setActivePage] = useState(0);
  const [dashboardsPerPage, setDashboardsPerPage] = useState(50);
  const [filterString, setfilterString] = useState('');
  const [showDashboardDialog, setShowDashboardDialog] = useState(false);

  const { data, loading } = useQuery<TimerListQuery, TimerListQueryVariables>(timerListQuery, {
    fetchPolicy: 'cache-and-network',
    variables: { limit: dashboardsPerPage, offset: activePage * dashboardsPerPage, filter: filterString },
  });

  const lowerCaseFilterString = filterString.toLowerCase();

  const timerList = data?.timers.timers.filter(({ description }) =>
    description?.toLowerCase().includes(lowerCaseFilterString)
  );

  const anyTimerExist = Boolean(data?.timers.totalCount);

  //   if (!data && !loading) {
  //     return null;
  //   }

  if (!loading && !anyTimerExist) {
    // Here show 'is empty' message
    return null;
  } else if (!data && loading) {
    // show loading spinner
    return null;
  } else if (data) {
    return (
      <FullBodyTableContainer>
        <Table size="small" stickyHeader>
          <OverviewTableHeader />
          <OverviewTableBody timers={data?.timers.timers} />
        </Table>
      </FullBodyTableContainer>
    );
    // <Pagination
    // //   data-testid="dashboard-overview-pagination"
    // //   count={filterString ? dashboardList.length : data?.dashboards.totalCount ?? 0}
    // //   onChangePage={(_, newPage) => setActivePage(newPage)}
    // //   onChangeRowsPerPage={(event) => {
    // //     setDashboardsPerPage(parseInt(event.target.value, 10));
    // //     setActivePage(0);
    // //   }}
    // //   page={activePage}
    // //   rowsPerPage={dashboardsPerPage}
    // />
  } else {
    return null;
  }
}

export default Overview;
