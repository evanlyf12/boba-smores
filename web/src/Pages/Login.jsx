import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {authenticateUser, isUserLoggedIn} from '../Auth.js';
import '../App.scss';
const axios = require('axios').default;


function Login() {
  
  const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

  const handleLogin = async googleData => {
    const url = "api/v1/auth/google";
    const res = await axios.post("http://localhost:3001/api/v1/auth/google", {
      data: {
        token: googleData.tokenId
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    const dataf = res.data;

    authenticateUser(JSON.stringify(dataf._id));
    routeChange(`/dashboard`);
  }
    useEffect (()=>{
        if (isUserLoggedIn()){

        routeChange(`/dashboard`);
        }

        },[])


  return (
      <div className="page">
        <div className="login container">
        <div className="loginContent">
            <h1>
                Log in
            </h1>
                <div>
                <GoogleLogin
                        render={renderProps => (
                            <button className="outlined" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Sign in with Google
                            </button>
                        )}
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                />
                </div>   
            </div>
        </div>
    </div>
  );
}

export default Login;
