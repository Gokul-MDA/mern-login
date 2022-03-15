import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitForm() {
    const header = {
      method: "Post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch("http://127.0.0.1:5000/api/signup/", header)
      .then((response) => response.json())
      .then((data) => console.log(data));

    this.setState({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  }

  render() {
    return (
      <div className="container">
        <span className="error animated tada" id="msg"></span>
        <form className="box">
          <h4>
            User<span>Registration</span>
          </h4>
          <h5>Sign up to create new account.</h5>
          <input
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
            type="text"
            placeholder="Name"
          />
          <input
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
            type="text"
            placeholder="Email"
          />
          <i className="typcn typcn-eye" id="eye"></i>

          <input
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
            type="password"
            placeholder="Password"
          />
          <i className="typcn typcn-eye" id="eye"></i>

          <input
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.changeHandler}
            type="password"
            placeholder="Confirm Password"
          />
          <Link to="login" className="dnthave">
            Already have an account? Sign In
          </Link>
        </form>
        <button type="submit" className="btn1" onClick={this.submitForm}>
          Submit
        </button>
      </div>
    );
  }
}

export default Register;
