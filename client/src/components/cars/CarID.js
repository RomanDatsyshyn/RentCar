import React, { Component } from 'react';

class CarID extends Component {
  render() {
    const { car } = this.props;

    let img = `http://localhost:3000/${car.carImage}`;

    const price = car.price;
    const price5 = Math.ceil(car.price - car.price * 0.05);
    const price10 = Math.ceil(car.price - car.price * 0.1);
    const price15 = Math.ceil(car.price - car.price * 0.15);

    return (
      <div className='col-12 col-md-8 col-sm-6 '>
        <div className='card mb-3'>
          <div className='row no-gutters'>
            <div className='col-md-12'>
              <div className='card-body'>
                <h2 className='card-title'>{car.name}</h2>
                <hr />
                <h6>{car.class}</h6>
                <h6>
                  {car.town} / {car.year} / {car.transmission} / {car.engine}
                </h6>
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
              </div>
            </div>
            <div className='col-md-10 auto'>
              <img src={img} className='card-img-top' alt={car.name} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarID;
