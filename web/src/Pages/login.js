import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {authenticateUser} from '../Auth.js';
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

    authenticateUser(JSON.stringify(dataf));
    routeChange(`/`);
    // store returned user somehow
  }


  return (
    <div className="loginBox">
      <div className="loginContent">
          <h1>
              Log in
          </h1>
            <div>
              <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={handleLogin}
                  onFailure={handleLogin}
                  cookiePolicy={'single_host_origin'}
              />
            </div>   
        </div>
    </div>
  );
}

export default Login;
