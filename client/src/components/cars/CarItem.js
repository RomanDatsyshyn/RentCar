import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CarItem extends Component {
  render() {
    const { car } = this.props;

    const price = car.price;
    const price5 = Math.ceil(car.price - car.price * 0.05);
    const price10 = Math.ceil(car.price - car.price * 0.1);
    const price15 = Math.ceil(car.price - car.price * 0.15);

    return (
      <div className='col-12 col-md-4 col-sm-6'>
        <div className='card mb-4'>
          <Link to={`/cars/${car.id}`}>
            <img src={car.carImage} className='card-img-top' alt={car.name} />
          </Link>
          <div className='card-body'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>1-2 Доби</th>
                  <th scope='col'>3-7 Діб</th>
                  <th scope='col'>8-30 Діб</th>
                  <th scope='col'>31-60 Діб</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{price}$</td>
                  <td>{price5}$</td>
                  <td>{price10}$</td>
                  <td>{price15}$</td>
                </tr>
              </tbody>
            </table>
            <h6>{car.class}</h6>
            <h6>
              {car.town} / {car.year} / {car.engine}
            </h6>
            <h5 className='card-title'>{car.name}</h5>
            <Link to={`/cars/${car.id}`} className='btn warning btn-block'>
              Обрати
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

CarItem.propTypes = {
  car: PropTypes.object.isRequired
};

export default CarItem;
