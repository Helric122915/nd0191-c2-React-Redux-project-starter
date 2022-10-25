import "../App.css";
import { handleInitialData } from "../actions/shared";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { Route, useLocation, Routes } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import Poll from "./Poll";
import Dashboard from "./Dashboard";
import PollCreate from "./PollCreate";
import Leaderboard from "./Leaderboard";
import NotFoundResult from "./NotFoundResult";
import RequireAuth from "./RequireAuth";

function App(props) {
  const location = useLocation();

  const onLoginPage = location.pathname.includes("login");

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="App">
        {!onLoginPage && <Nav />}
        {props.loading ? null : (
          <Routes>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <NotFoundResult />
                </RequireAuth>
              }
            />
            <Route
              path="/"
              exact
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/question/:id"
              element={
                <RequireAuth>
                  <Poll />
                </RequireAuth>
              }
            />
            <Route
              path="/add"
              element={
                <RequireAuth>
                  <PollCreate />
                </RequireAuth>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <RequireAuth>
                  <Leaderboard />
                </RequireAuth>
              }
            />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ users }) => ({
  loading: users === null,
});

export default connect(mapStateToProps)(App);
