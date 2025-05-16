import React from "react"
import Routing from "./routing/Routing"
import { useCurrentUser } from "./features/Queries/authQuerie"
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/features/authSlice";

function App() {
  const { data: user , isLoading } = useCurrentUser();
  const dispatch = useDispatch();

  useEffect(()=>{
      if (user){
        dispatch(setCredentials(user))
      }
          
  },[user , dispatch])

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
