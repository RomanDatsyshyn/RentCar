import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/AuthActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
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

    const updatedUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    this.props.updateUser(updatedUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className='display-4 text-center'>
          Редагування персональних данних
        </h1>
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            label='Введіть ваш email:'
            type='email'
            error={errors.email}
            placeholder='Example@email.com'
            name='email'
            value={this.state.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Ваше ім'я, прізвище та побатькові:"
            type='text'
            error={errors.name}
            placeholder='Мазур Віталій Володимирович'
            name='name'
            value={this.state.name}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label='Придумайте пароль'
            type='password'
            error={errors.password}
            placeholder='MZKIT2019'
            name='password'
            value={this.state.password}
            onChange={this.onChange}
          />

          <button type='submit' className='btn btn-lg btn-block info mt-4'>
            Змінити данні
          </button>
        </form>
      </div>
    );
  }
}

Edit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { updateUser })(withRouter(Edit));
