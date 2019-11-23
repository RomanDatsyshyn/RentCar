import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getUserOrders } from '../../actions/OrderActions';
import { removeUser } from '../../actions/AuthActions';
import jsPDF from 'jspdf';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserOrders();
  }

  jsPdfGenerator = () => {
    const { orders, loading } = this.props.UserOrdersReducer;
    let pdf = '';

    for (let i = 0; i < orders.orders.length; i++) {
      pdf += `\t ${orders.orders[i].fromDate} \t ${orders.orders[i].toDate}    ${orders.orders[i].price} \n\n`;
    }

    var doc = new jsPDF('p', 'pt');
    var imgData =
      'data:image/png;base64,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';

    // Save the Data

    doc.addImage(imgData, 'PNG', 50, 10, 500, 100);
    doc.text(20, 20, '\n\n\n\n\n\n\n' + pdf);

    doc.save('Звіт.pdf');
  };

  render() {
    const { orders, loading } = this.props.UserOrdersReducer;
    let data;
    let html = '';

    if (orders === null || loading) {
      data = <Spinner />;
    } else {
      for (let i = 0; i < orders.orders.length; i++) {
        html += `<tr>
        <th scope='row'>${i + 1}</th>
        <td>${orders.orders[i].fromDate}</td>
        <td>${orders.orders[i].toDate}</td>
        <td>${orders.orders[i].price}</td>
        <td>
          <a href='/orders/edit/${orders.orders[i].id}' className='btn warning'>
            Змінити
          </a>
          <a href='/orders/remove/${
            orders.orders[i].id
          }' className='btn alert-danger'>
            Видалити
          </a>
        </td>
      </tr>`;
      }

      data = (
        <div className='row mt-4'>
          <div className='col-12 col-md-4 col-sm-6 '>
            <center>
              <img
                src='https://www.trzcacak.rs/myfile/full/65-650485_login-user-default-user-image-png.png'
                alt='...'
                width='50%'
              />
            </center>
            <h2>{orders.name}</h2>
            <h5>Особистий кабінет</h5>
            <a href={`/edit/${orders.id}`} className='btn warning btn-block'>
              Змінити персональні дані
            </a>

            <button
              onClick={removeUser(this.props.history)}
              className='btn info btn-block'
              type='submit'
            >
              Видалити акаунт
            </button>
            <button
              onClick={this.jsPdfGenerator}
              className='btn alert-success btn-block'
              type='primary'
            >
              Мої замовлення в PDF
            </button>
          </div>
          <div className='col-12 col-md-8 col-sm-6 '>
            <div className='card mb-3'>
              <div className='row no-gutters'>
                <div className='col-md-12'>
                  <div className='card-body'>
                    <h2 className='card-title'>Список моїх замовлень:</h2>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Початок замовлення</th>
                          <th scope='col'>Закінчення замовлення</th>
                          <th scope='col'>Ціна</th>
                          <th scope='col'>Дії</th>
                        </tr>
                      </thead>
                      <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

Profile.propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  UserOrdersReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UserOrdersReducer: state.UserOrdersReducer
});

export default connect(mapStateToProps, { getUserOrders, removeUser })(Profile);
