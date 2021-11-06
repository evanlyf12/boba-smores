import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {authenticateUser, isUserLoggedIn} from '../Auth.js';
import {motion} from 'framer-motion'
import '../App.scss';
const axios = require('axios').default;


function Login() {
  
  const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

  const handleLogin = async googleData => {
    await axios.post("https://bobasmorescrm.herokuapp.com/api/v1/auth/google", {
      data: {
        token: googleData.tokenId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
        const dataf = res.data;
    
        authenticateUser(JSON.stringify(dataf._id));
        routeChange(`/dashboard`);
    })

  }
    useEffect (()=>{
        if (isUserLoggedIn()){

        routeChange(`/dashboard`);
        }
// eslint-disable-next-line
        },[])


  return (
      <div className="login-page">
        <motion.div className="login container"
             initial={{ opacity: 0,y:20 }}
             animate={{ opacity: 1,y:0 }}
             exit={{ opacity: 0, transition: { duration: 0.1 } }}
             transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="login-content">
                <motion.h1 
                     initial={{ opacity: 0,y:30 }}
                     animate={{ opacity: 1,y:0 }}
                     exit={{ opacity: 0, transition: { duration: 0.1 } }}
                     transition={{ duration: 0.6, delay: 0.6 }}>
                    Log in
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0,y:30 }}
                  animate={{ opacity: 1,y:0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.6, delay: 0.7 }}>
                <GoogleLogin
                        render={renderProps => (
                            <button variant="outlined" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Sign in with Google
                            </button>
                        )}
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                />
                </motion.div>   
            </div>
        </motion.div>
    </div>
  );
}

export default Login;
