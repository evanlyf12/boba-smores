import React from 'react';
import '../App.scss';
function Login() {
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

                <label className="formTitle"for="pword">Password</label><br/>
                <div className="gap"/>
                <input className="inputLogin" type="text" id="pword" name="pword" placeholder="collegue1234"/><br/>
                <p className="forgotpword">Forgot your password?</p>       
                <div style={{textAlign:'center'}}>
                  <input className="loginConfirm" type="submit" value="Log in"/>
                </div>         

              </form>     
                  <div className="googleSignIn">
                    <a href="/" style={{textDecoration:'none',color:'white'}}>
                   <img src="googleLogin.png" alt="googlesign"/><span> Continue with Google</span>
                   </a>
                  </div>
        </div>
 
      </div>
     </div>
  );
}

export default Login;
