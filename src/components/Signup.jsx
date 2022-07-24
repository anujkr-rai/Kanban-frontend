import { FitnessCenterSharp } from "@material-ui/icons";
import React from "react";
import "../css/Login.css";
import useInputState from "../hooks/useInputState";



const Signup = (props) => {
  const {routeProps}=props;
  const [username, handleUsernameChange, resetUsername] = useInputState("");
  const [password, handlePasswordChange, resetPassword] = useInputState("");
  const [firstName, handleFirstNameChange, resetFirstName] = useInputState("");
  const [lastName, handleLastNameChange, resetLastName] = useInputState("");
  // console.log(props);

  let handleSubmit = async (e) => {
    e.preventDefault();
    // let allusers= await fetch("https://demokanbanback.herokuapp.com/getAllUsers", {
    //   method: "GET",
    //   mode:"cors",
    // });
    // console.log(allusers)
    // let isUnique=true;
    // for(let user in allusers){
    //   if(user.username==username){
    //     isUnique=false;
    //   }
    // }

    // if (isUnique) {
    try {
      let res = await fetch("https://demokanbanback.herokuapp.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode:"cors",
        body: JSON.stringify({
          first_name:firstName,
          last_name:lastName,
          username:username,
          password:password
        })
      });
      console.log(res);
      if (res.status === 200) {
        
        console.log("Created User");
        routeProps.history.push("/login");

      } 
      else{
        // toast('Email not Found')
        console.log("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  // }
  };

  return (
    <div className="Login">
      <h2>Signup</h2>
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="login-form-input">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            className="form-inp"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="login-form-input">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            className="form-inp"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="login-form-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-inp"
            placeholder=""
            value={username}
            onChange={handleUsernameChange}
            required
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
            required
          />
        </div>
        <div className="user-settings">
          <div className="remember-box">
            {/* <input type="checkbox" id="remember-checkbox" />
            <label htmlFor="remember-checkbox">Remember Me</label> */}
          </div>
          <a href="/login">Already a user, Sign in!</a>
        </div>
        <button type="submit" className="form-btn">
          SignUp
        </button>
        
      </form>
    </div>
  );
};

export default Signup;
