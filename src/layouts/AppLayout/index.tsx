import React from 'react';
import { Container } from '@material-ui/core';
// import { Outlet } from "react-router-dom";
import { Header } from '../Header';
import { SideBar } from '../SideBar';
import './appLayout.scss';

/**
 * This is the main app layout component. We define elements like
 * header and sidebar, it will render any children passed as props inside
 * the layout content.
 *
 * In this case, we will connect this Parent component to redux to get the
 * pathname and other router functions to pass to @Breadcrumb and @Sidebar
 * since both have the same redux dependencies.
 *
 * @children        - Children prop, will render a react node inside the layout
 * @pathname        - (redux) the actual pathname from the router
 */

type AppLayoutType = {
  pathname?: string | undefined;
  children: NonNullable<React.ReactNode>;
  isAuth?: boolean;
};

const AppLayout: React.FC<AppLayoutType> = ({ pathname, children }) => (
  <Container maxWidth={false} className="app-layout">
    <Header pathname={pathname} />
    <Container className="app-layout-content" id="app-layout">
      <SideBar />
      <Container className="body-content">{children}</Container>
    </Container>
  </Container>
);

export default AppLayout;
