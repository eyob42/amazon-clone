import React from "react";
import Classes from "./Signup.module.css";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <section className={Classes.login}>
      {/* logo */}

      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/960px-Amazon_logo.svg.png?_=20250504041148"
          alt=""
        />
      </Link>
      {/* form */}

      <div className={Classes.login__container}>
        <h1>sign in</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={Classes.login__signInButton}>Sign In</button>
        </form>

        {/* Aggrement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className={Classes.login__registerButton}>Create Your Amazon Account</button>

      </div>
    </section>
  );
}

export default Auth;
