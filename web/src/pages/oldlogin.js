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
    const res = await axios.post("https://bobasmorescrm.herokuapp.com/api/v1/auth/google", {
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
    <div>
      <div className="loginBox">
        <div className="login-content">
          <h1>
              Log in
          </h1>   
          <form className="formLogin">
            
            <label className="inputLabel"for="email">Email address</label>
            <input className="inputField" type="text" id="email" name="email" placeholder="bobasmores@crm.com"/><br/>
            
            <label className="inputLabel"for="pword">Password</label><br/>
            <input className="inputField" type="password" id="pword" name="pword" placeholder="Password"/><br/>
            <a className="forgotpword" href="/passwordreset">Forgot your password?</a>   

            <div style={{textAlign:'center'}}>
              <input type="submit" value="Log in"></input>
            </div>

            <hr/>

            <div style={{textAlign:'center'}}>
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
          </form>
        </div>
 
      </div>
    </div>
  );
}

export default Login;
