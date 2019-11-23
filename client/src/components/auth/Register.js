import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/AuthActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className="display-4 text-center">Реєстрація</h1>
        <p className="lead text-center">
          Створіть ваш особистий акаунт на <b>RentCar</b>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            label="Введіть ваш email:"
            type="email"
            error={errors.email}
            placeholder="Example@email.com"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Ваше ім'я, прізвище та побатькові:"
            type="text"
            error={errors.name}
            placeholder="Мазур Віталій Володимирович"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Придумайте пароль"
            type="password"
            error={errors.password}
            placeholder="MZKIT2019"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />

          <button type="submit" className="btn btn-lg btn-block info mt-4">
            Зареєструватися
          </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
