import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/AuthActions';
import { logoutAdmin } from '../../actions/AdminAuthActions';
import header from '../../header.svg';

class NavBar extends Component {
  onClickLogoutUser(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onClickLogoutAdmin(e) {
    e.preventDefault();
    this.props.logoutAdmin();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdminAuthenticated } = this.props.adminAuth;

    const authLinks = (
      <span className='navbar-text'>
        <Link to='/profile' className='card-link mr-4'>
          <i className='fas fa-user'></i> Мій кабінет
        </Link>
        <Link
          to='/'
          onClick={this.onClickLogoutUser.bind(this)}
          className='card-link mr-4'
        >
          Вийти
        </Link>
      </span>
    );

    const guestLinks = (
      <span className='navbar-text'>
        <Link to='/login' className='card-link'>
          Вхід
        </Link>{' '}
        /{' '}
        <Link to='/register' className='card-link ml-0 mr-3'>
          Реєстрація
        </Link>
      </span>
    );

    const adminAuthLinks = (
      <span className='navbar-text'>
        <Link
          to='/'
          onClick={this.onClickLogoutAdmin.bind(this)}
          className='card-link mr-4'
        >
          Вихід для адміна
        </Link>
      </span>
    );

    const guest = (
      <span className='navbar-text'>
        <Link to='/admin' className='card-link'>
          Адмін-панель
        </Link>
      </span>
    );

    const adminBar = (
      <span className='navbar-text'>
        <Link to='/addcar' className='card-link'>
          Додати авто
        </Link>
      </span>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light '>
          <Link className='navbar-brand' to='/'>
            <b>
              <i className='fas fa-car'></i> RentCar
            </b>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  Головна <span className='sr-only'>(поточна)</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/cars'>
                  Автопарк
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/pricelist'>
                  Ціни
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/rules'>
                  Умови
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
            {isAdminAuthenticated ? adminAuthLinks : guest}
          </div>
        </nav>
        <img src={header} className='img-fluid' alt='Header' />
        {isAdminAuthenticated ? adminBar : null}
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  adminAuth: state.adminAuth,
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, logoutAdmin })(NavBar);
