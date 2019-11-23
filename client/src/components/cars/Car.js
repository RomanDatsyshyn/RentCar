import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import CarItem from './CarID';
import { getCar } from '../../actions/CarActions';
import AddOrder from '../orders/AddOrder';

class Car extends Component {
  componentDidMount() {
    this.props.getCar(window.location.pathname);
  }

  render() {
    const { car, loading } = this.props.carState;
    let carItems;

    if (car === null || loading) {
      carItems = <Spinner />;
    } else {
      carItems = <CarItem key={Math.random()} car={car} />;
    }

    return (
      <div className='row mt-4'>
        <AddOrder />
        {carItems}
      </div>
    );
  }
}

Car.propTypes = {
  getCar: PropTypes.func.isRequired,
  carState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  carState: state.carState
});

export default connect(mapStateToProps, { getCar })(Car);
