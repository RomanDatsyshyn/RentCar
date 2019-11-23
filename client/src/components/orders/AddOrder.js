import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addOrder } from '../../actions/OrderActions';
// import { Link } from 'react-router-dom';

class AddOrder extends Component {
  constructor() {
    super();
    this.state = {
      fromDate: '',
      toDate: '',
      price: '',
      content: '',
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
    const { car } = this.props.carState;
    e.preventDefault();

    const newOrder = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      car: car.id,
      price: this.state.price,
      content: this.state.content,
      isCompleted: false
    };

    this.props.addOrder(newOrder, this.props.history);
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <button className='btn info btn-block' type='submit'>
        Зробити замовлення
      </button>
    );

    const guestLinks = (
      <div>
        <div className='alert alert-danger' role='alert'>
          Увійдіть або зареєструйтесь на сайті, для того щоб зробити замовлення!
        </div>
        <a
          href='#1'
          className='btn btn-secondary btn-block disabled'
          tabIndex='-1'
          role='button'
          aria-disabled='true'
        >
          Зробити замовлення
        </a>
      </div>
    );

    return (
      <div className='col-12 col-md-4 col-sm-6 '>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item active' aria-current='page'>
              Параметри замовлення
            </li>
          </ol>
        </nav>
        <form noValidate onSubmit={this.onSubmit}>
          <div className='form-row'>
            <div className='col-md-12 mb-3'>
              <label htmlFor='datepicker'>Дата отримання автомобіля:</label>
              <input
                name='fromDate'
                type='date'
                value={this.state.fromDate}
                onChange={this.onChange}
                className='form-control'
                required
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='validationDefault05'>
                Дата повернення автомобіля:
              </label>
              <input
                name='toDate'
                type='date'
                value={this.state.toDate}
                onChange={this.onChange}
                className='form-control'
                required
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='validationDefault05'>Ціна:</label>
              <input
                name='price'
                className='form-control'
                value={this.state.price}
                onChange={this.onChange}
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='validationDefault05'>Особисті побажання:</label>
              <input
                name='content'
                className='form-control'
                placeholder='Доставка авто'
                value={this.state.content}
                onChange={this.onChange}
              />
            </div>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </form>
      </div>
    );
  }
}

AddOrder.propTypes = {
  addOrder: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  carState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  carState: state.carState
});

export default connect(mapStateToProps, { addOrder })(withRouter(AddOrder));
