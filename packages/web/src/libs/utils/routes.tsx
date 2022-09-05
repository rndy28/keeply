import { useMeQuery } from "generated/graphql";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const [{ data }] = useMeQuery();

  return !data?.me ?? !data ? <Outlet /> : <Navigate to="/notes" />;
};

export const PrivateRoute = () => {
  const [{ data }] = useMeQuery();

  return data?.me ?? data ? <Outlet /> : <Navigate to="/signin" />;
};
