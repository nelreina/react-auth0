import React, { useEffect } from "react";

const Callback = ({ location }) => {
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
    }
  }, [location]);
  return <h1>Loading...</h1>;
};

export default Callback;
