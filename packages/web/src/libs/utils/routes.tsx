import { useMeQuery } from "generated/graphql";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <div />;

  return !data?.me ?? !data ? <Outlet /> : <Navigate to="/notes" />;
};

export const PrivateRoute = () => {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <div />;

  return data?.me ?? data ? <Outlet /> : <Navigate to="/signin" />;
};
