import React, { Component } from "react";
import "./Login.css";
import { Link, withRouter } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.login = this.login.bind(this);
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  login() {
    const header = {
      method: "Post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch("http://127.0.0.1:8000/api/signin", header)
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push("/home");
        console.log(result);
      })
      // .then(this.props.history.push("/home"))
      .then((data) => console.log(data));
  }
  render() {
    return (
      <div className="login">
        <span className="error animated tada" id="msg"></span>
        <form className="form">
          <h4>
            User<span>Login</span>
          </h4>
          <h5>Sign in to your account.</h5>
          <input
            value={this.state.email}
            name="email"
            onChange={this.changeHandler}
            type="text"
            placeholder="Email"
            autoComplete="off"
          />
          <i className="typcn typcn-eye" id="eye"></i>
          <input
            value={this.state.password}
            onChange={this.changeHandler}
            name="password"
            type="password"
            placeholder="Password"
          />
          <a href="gmail.com" className="forgetpass">
            Forget Password?
          </a>
          <Link to="register" className="dnthave">
            Don’t have an account? Sign up
          </Link>
        </form>
        <button onClick={this.login} className="login-btn1">
          Login
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
