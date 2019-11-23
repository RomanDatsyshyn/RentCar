import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import CarItem from "../cars/CarItem";
import { findCars } from "../../actions/SearchActions";
import { getCars } from "../../actions/CarActions";

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      town: "",
      class: "",
      fromDate: "",
      toDate: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCars();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const searchData = {
      params: {
        town: this.state.town,
        class: this.state.class,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate
      }
    };

    this.props.findCars(searchData);
  }

  render() {
    const { findedCars, loading } = this.props.carsSearchState;
    const { cars } = this.props.carsState;
    let isLoading = this.props.carsState.loading;

    let carItems;

    if (loading) {
      carItems = <Spinner />;
    } else {
      if (findedCars !== null && findedCars.length > 0) {
        carItems = findedCars.map(car => (
          <CarItem key={Math.random()} car={car} />
        ));
      } else if (findedCars === null) {
        // Якщо ще нічого не шукали, то виводимо весь автопарк
        if (cars === null || isLoading) {
          carItems = <Spinner />;
        } else {
          if (cars.length > 0) {
            carItems = cars.map(car => (
              <CarItem key={Math.random()} car={car} />
            ));
          } else {
            carItems = <h4>Немає жодної машини...</h4>;
          }
        } // End
      } else {
        carItems = (
          <h4 className="ml-3">Не знайдено жодної вільної машини...</h4>
        );
      }
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="col-md-3 mb-3">
              <label htmlFor="inputState">
                <i className="fas fa-city"></i> Місто
              </label>
              <select
                id="inputState"
                name="town"
                className="form-control"
                defaultValue={"DEFAULT"}
                onChange={this.onChange}
              >
                <option value="DEFAULT" disabled>
                  Оберіть місто...
                </option>
                <option value="Львів">Львів</option>
                <option value="Київ">Київ</option>
                <option value="Івано-Франківськ">Івано-Франківськ</option>
                <option value="Тернопіль">Тернопіль</option>
                <option value="Харків">Харків</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="inputState">
                <i className="fas fa-car-side"></i> Клас автомобіля
              </label>
              <select
                id="inputState"
                name="class"
                className="form-control"
                defaultValue={"DEFAULT"}
                onChange={this.onChange}
              >
                <option value="DEFAULT" disabled>
                  Обрати клас автомобіля...
                </option>
                <option value="Економ">Економ</option>
                <option value="Стандарт">Стандарт</option>
                <option value="Комфорт">Комфорт</option>
                <option value="ПРЕМІУМ">ПРЕМІУМ</option>
                <option value="Позашляховики">Позашляховики</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="datepicker">Дата отримання автомобіля:</label>
              <input
                name="fromDate"
                type="date"
                onChange={this.onChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationDefault05">
                Дата повернення автомобіля:
              </label>
              <input
                name="toDate"
                type="date"
                onChange={this.onChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <button className="btn info btn-block" type="submit">
            Підібрати авто
          </button>
        </form>
        <div className="row mt-4">{carItems}</div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  findCars: PropTypes.func.isRequired,
  carsSearchState: PropTypes.object.isRequired,
  getCars: PropTypes.func.isRequired,
  carsState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  carsSearchState: state.carsSearchState,
  carsState: state.carsState
});

export default connect(
  mapStateToProps,
  { findCars, getCars }
)(SearchForm);
