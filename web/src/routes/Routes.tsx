import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";

type RoutePropsTemp = Omit<RouteProps, "component">;
interface RouteWrapperProps extends RoutePropsTemp {
  isPrivate?: boolean;
  isDashboard?: boolean;
  landing?: boolean;
  component: React.ElementType;
}

interface ElementProps extends React.FunctionComponent<any> {
  isDashboard?: boolean;
}

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isDashboard,
  landing,
  ...rest
}: RouteWrapperProps) {
  const { user: signed } = useUserContext();

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate && !landing) {
    return <Redirect to="/dashboard" />;
  }

  const Layout: ElementProps = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) =>
        landing ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Layout isDashboard>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
}
