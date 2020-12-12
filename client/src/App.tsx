import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DefaultErrorBoundary from './components/ErrorBoundary/components/DefaultErrorFallback/DefaultErrorFallback';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SideNavigation from './components/SideNavigation/SideNavigation';
import { Main, SectionContainer } from './utils/appStyles.styles';

const Timer = lazy(() => import('./screens/Timer/Timer'));
const Overview = lazy(() => import('./screens/Overview/Overview'));

function App() {
  return (
    <>
      <SideNavigation />

      <SectionContainer>
        <Main>
          <Suspense fallback={null}>
            <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
              <Route path="/" exact>
                <Timer />
              </Route>

              <Route path="/overview" exact>
                <Overview />
              </Route>
            </ErrorBoundary>
          </Suspense>
        </Main>
      </SectionContainer>
    </>
  );
}

export default App;
