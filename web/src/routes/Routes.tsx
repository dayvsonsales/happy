import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";

type RoutePropsTemp = Omit<RouteProps, "component">;

interface RouteWrapperProps extends RoutePropsTemp {
  isPrivate?: boolean;
  landing?: boolean;
  component: React.ElementType;
}

export default function RouteWrapper({
  component: Component,
  isPrivate,
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

  const Layout = landing ? React.Fragment : signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
