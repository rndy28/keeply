/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider as UrqlProvider } from "urql";

import { Loader } from "components/UI/atoms";
import { ModalProvider } from "libs/contexts/ModalContext";
import { SidebarProvider } from "libs/contexts/SidebarContext";

import Compose from "libs/utils/Compose";
import { client } from "libs/utils/createUrqlClient";
import { PrivateRoute, PublicRoute } from "libs/utils/routes";
import Notes from "pages/notes";
import Trash from "pages/trash";

const SignIn = lazy(() => import("pages/auth/signin"));
const SignUp = lazy(() => import("pages/auth/signup"));
const ChangePassword = lazy(() => import("pages/auth/changePassword"));
const ForgotPassword = lazy(() => import("pages/auth/forgotPassword"));
const NotFound = lazy(() => import("pages/404"));
const Maintenance = lazy(() => import("pages/503"));

const App = () => {
  if (import.meta.env.VITE_MNT) return <Maintenance />;

  return (
    <UrqlProvider value={client}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="signin" />} />
          <Route path="/notes" element={<PrivateRoute />}>
            <Route
              path="/notes"
              element={
                <Compose components={[SidebarProvider, ModalProvider]}>
                  <Notes />
                </Compose>
              }
            />
          </Route>
          <Route path="/reminders" element={<PrivateRoute />}>
            <Route
              path="/reminders"
              element={
                <Compose components={[SidebarProvider, ModalProvider]}>
                  <Notes />
                </Compose>
              }
            />
          </Route>
          <Route path="/archived" element={<PrivateRoute />}>
            <Route
              path="/archived"
              element={
                <Compose components={[SidebarProvider, ModalProvider]}>
                  <Notes />
                </Compose>
              }
            />
          </Route>
          <Route path="/trash" element={<PrivateRoute />}>
            <Route
              path="/trash"
              element={
                <Compose components={[SidebarProvider, ModalProvider]}>
                  <Trash />
                </Compose>
              }
            />
          </Route>
          <Route path="/signin" element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/signup" element={<PublicRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/forgot-password" element={<PublicRoute />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/change-password/:token" element={<PublicRoute />}>
            <Route path="/change-password/:token" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </UrqlProvider>
  );
};

export default App;
