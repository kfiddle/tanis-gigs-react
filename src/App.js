import { Switch, Route } from "react-router";
import { useState } from "react";

import Layout from "./components/UI/Layout";
import AllPlayers from "./pages/AllPlayers";
import AllGigs from "./pages/AllGigs";

import "./App.css";

function App() {
  const [modalIsClosed, setModalIsClosed] = useState(false);

  const modalCloseHandler = (flag) => {
    setModalIsClosed(flag);
  };
  return (
    <Layout modalCloseHandler={modalCloseHandler}>
      <Switch>
        <Route path={"/all-players"} exact>
          <AllPlayers modalIsClosed={modalIsClosed} />
        </Route>

        <Route path={"/sub-gigs"} exact>
          <AllGigs modalIsClosed={modalIsClosed} />
        </Route>

        {/* <Route path={"/season"} exact>
        <Season modalIsClosed={modalIsClosed} />
      </Route>  */}
      </Switch>
    </Layout>
  );
}

export default App;
