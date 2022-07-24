import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  let [currentUser, setCurrentUser]=useState(localStorage.getItem("user_id"))
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => (currentUser ? <Home
          routeProps={routeProps} />
          : <Login
            routeProps={routeProps} setCurrentUser={setCurrentUser}/>)}
      ></Route>
      <Route exact path="/login" render={(routeProps) => <Login  routeProps={routeProps} currentUser={currentUser}  setCurrentUser={setCurrentUser} />}></Route>
      <Route exact path="/signup" render={(routeProps) => <Signup  routeProps={routeProps} />}></Route>
    </Switch>
  );
}

export default App;
