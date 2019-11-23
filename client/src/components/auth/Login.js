import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/AuthActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className='display-4 text-center'>Вхід на сайт</h1>
        <p className='lead text-center'>Увійдіть у ваш особистий акаунт</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            label='Ваш email'
            type='email'
            error={errors.email}
            placeholder='Введіть email'
            name='email'
            value={this.state.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label='Пароль'
            type='password'
            error={errors.password}
            placeholder='Введіть пароль'
            name='password'
            value={this.state.password}
            onChange={this.onChange}
          />

          <button type='submit' className='btn btn-lg btn-block info mt-4'>
            Увійти
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
