import React, { Suspense } from 'react';
import NavigationItem from './components/NavigationItem/NavigationItem';
import { NavigationContainer, NavigationItemsContainer, SideNavigationContainer } from './sideNavigation.styles';

function SideNavigation() {
  return (
    <SideNavigationContainer variant="permanent" PaperProps={{ style: { width: '10rem' }, elevation: 2 }}>
      <Suspense fallback={null}>
        <NavigationContainer>
          <NavigationItemsContainer>
            <NavigationItem to="/" exact>
              Timer
            </NavigationItem>

            <NavigationItem to="/overview">Overview</NavigationItem>
          </NavigationItemsContainer>
        </NavigationContainer>
      </Suspense>
    </SideNavigationContainer>
  );
}

export default SideNavigation;
