import React from "react";
import "../css/Login.css";
import useInputState from "../hooks/useInputState";

const Login = (props) => {
  let {routeProps, currentUser, setCurrentUser}=props;
  const [username, handleUsernameChange, resetUsername] = useInputState("");
  const [password, handlePasswordChange, resetPassword] = useInputState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8081/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode:"cors",
        body: JSON.stringify({
          username:username,
          password:password
        })
      });
      let response = await res.status
      if (response === 200) {
        let resp = await res.json()
        localStorage.setItem("token",resp.token);
        localStorage.setItem("user_id",resp.user_id);
        
        setCurrentUser(localStorage.getItem("user_id"))
        console.log(currentUser)

        routeProps.history.push("/")
        
      } 
      else if(response === 417) {
        alert({
          title: 'Wrong Password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log("Wrong Password");
      }
      else{
        alert({
          title: 'Email not Found',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log("email not found");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="Login">
      <h2>Login Budd!!</h2>
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="login-form-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-inp"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form-input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-inp"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="user-settings">
          <div className="remember-box">
            {/* <input type="checkbox" id="remember-checkbox" />
            <label htmlFor="remember-checkbox">Remember Me</label> */}
          </div>
          <a href="/signup">New User? Sign up!</a>
        </div>
        <button type="submit" className="form-btn">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
