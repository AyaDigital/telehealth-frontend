import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppState } from '../../state';
import { useLocation, useHistory } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isAuthReady, user, isFetching, signIn } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();

  const renderChildren = user || !process.env.REACT_APP_SET_AUTH;

  const login = () => {
    signIn?.('')
      .then(() => {
        history.replace(location?.state?.from || { pathname: '/' });
      })
      .catch(err => console.error(err));
  };

  if (!isAuthReady) {
    return null;
  } else {
    if (user === null && !isFetching) {
      login(); // Automatically redirect to login page
    }
    console.log('Redirect would go here');
  }

  return <Route {...rest} render={({ location }) => (renderChildren ? children : null)} />;
}
