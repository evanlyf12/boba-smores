import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {authenticateUser, isUserLoggedIn} from '../Auth.js';
import '../App.scss';
const axios = require('axios').default;
//a

function Login() {
  
  const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

  const handleLogin = async googleData => {
    // console.log(googleData.tokenId);
    // console.log('t');
    // console.log(JSON.stringify(googleData.tokenId));
    const res = await axios.post("http://localhost:3001/api/v1/auth/google", {
      data: {
        token: googleData.tokenId
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    const dataf = res.data;
    console.log(dataf);

    authenticateUser(JSON.stringify(dataf._id));
    routeChange(`/dash`);
    // store returned user somehow
  }
  useEffect (()=>{
    if (isUserLoggedIn()){

      routeChange(`/dash`);
    }

    },[])

  return (
    <div className="containerLogin">
      <div className="loginBox">
        <div className="loginContents">
              <h1 className="loginHeader">
                  Log in
              </h1>   
              <form className="formLogin">
                <label className="formTitle"for="email">Email address</label><br/>
                <div className="gap"/>

                <input className="inputLogin" type="text" id="email" name="email" placeholder="bobasmores@crm.com"/><br/>

                <label className="formTitle"htmlFor="pword">Password</label><br/>
                <div className="gap"/>
                <input className="inputLogin" type="text" id="pword" name="pword" placeholder="collegue1234"/><br/>
                <p className="forgotpword">Forgot your password?</p>       
                <div style={{textAlign:'center'}}>
                  <input className="loginConfirm" type="submit" value="Log in"/>
                </div>         

              </form>     
                  <div>
                  <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Sign in with Google"
                      onSuccess={handleLogin}
                      onFailure={handleLogin}
                      cookiePolicy={'single_host_origin'}
                  />
                    {/* <a href="/" style={{textDecoration:'none',color:'white'}}>
                   <img src="googleLogin.png" alt="googlesign"/><span> Continue with Google</span>
                   </a> */}
                  </div>
        </div>
 
      </div>
     </div>
  );
}

export default Login;
