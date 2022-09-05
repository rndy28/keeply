import { useMeQuery } from "generated/graphql";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const [{ data }] = useMeQuery();

  if (typeof data === "undefined") return null;

  return !data?.me || !data ? <Outlet /> : <Navigate to="/notes" />;
};

export const PrivateRoute = () => {
  const [{ data }] = useMeQuery();

  if (typeof data === "undefined") return null;

  return data?.me || data ? <Outlet /> : <Navigate to="/signin" />;
};
