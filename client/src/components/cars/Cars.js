import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import CarItem from "./CarItem";
import { getCars } from "../../actions/CarActions";

class Cars extends Component {
  componentDidMount() {
    this.props.getCars();
  }

  render() {
    const { cars, loading } = this.props.carsState;

    let carItems;

    if (cars === null || loading) {
      carItems = <Spinner />;
    } else {
      if (cars.length > 0) {
        carItems = cars.map(car => <CarItem key={Math.random()} car={car} />);
      } else {
        carItems = <h4>Немає жодної машини...</h4>;
      }
    }

    return (
      <div>
        <h1 className="display-4 text-center">Наш автопарк</h1>
        <p className="lead text-center">Хороші автомобілі для хороших людей!</p>
        <div className="row mt-4">{carItems}</div>
      </div>
    );
  }
}

Cars.propTypes = {
  getCars: PropTypes.func.isRequired,
  carsState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Після цього можна буде звертатись this.props.carsState
  carsState: state.carsState // пропс carsState містить в собі весь стейт, який пов'язаний з автомобілями (carsState)
});

export default connect(
  mapStateToProps,
  { getCars }
)(Cars);
