import React from "react"
import Routing from "./routing/Routing"
import { useCurrentUser } from "./features/Queries/authQuerie"
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/features/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data) {
      console.log('Setting user data in App:', user.data);
      dispatch(setCredentials(user.data));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <Loading fullScreen size="large" />;
  }

  return (
    <>
      <Routing />
    </>
  );
}

export default App;