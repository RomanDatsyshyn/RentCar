import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/AdminAuthActions';
import TextFieldGroup from '../common/TextFieldGroup';

class ALogin extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.adminAuth.isAdminAuthenticated) {
      this.props.history.push('/');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.adminAuth.isAdminAuthenticated) {
      this.props.history.push('/');
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

    const adminData = {
      name: this.state.name,
      password: this.state.password
    };

    this.props.loginAdmin(adminData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className='display-4 text-center'>Вхід в адмін-панель</h1>
        <p className='lead text-center'>Стороннім вхід заборонено!</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            label='Логін'
            type='text'
            error={errors.name}
            placeholder='Введіть логін'
            name='name'
            value={this.state.name}
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

ALogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  adminAuth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  adminAuth: state.adminAuth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginAdmin })(ALogin);
