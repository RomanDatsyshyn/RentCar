import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { add } from "../../actions/CarActions";
import TextFieldGroup from "../common/TextFieldGroup";

class AddCar extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      class: "",
      year: "",
      price: "",
      town: "",
      carImage: "",
      transmission: "",
      engine: ""
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

    const newCar = {
      name: this.state.name,
      class: this.state.class,
      year: this.state.year,
      price: this.state.price,
      town: this.state.town,
      carImage: this.state.carImage,
      transmission: this.state.transmission,
      engine: this.state.engine
    };

    this.props.add(newCar, this.props.history);
  }

  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Сторінка додавання авто</h1>
        <p className="lead text-center">
          Додавання машини до автопарку <b>RentCar</b>
        </p>
        <form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="custom-file mb-3">
            <input
              type="file"
              name="carImage"
              className="custom-file-input "
              id="customFile"
              value={this.state.carImage}
              onChange={this.onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Обрати фото
            </label>
          </div>

          <TextFieldGroup
            label="Введіть назву авто:"
            type="text"
            placeholder="Audi"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть класс автомобіля:"
            type="text"
            placeholder="Комфорт"
            name="class"
            value={this.state.class}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть рік автомобіля"
            type="text"
            placeholder="2019"
            name="year"
            value={this.state.year}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть ціну за добу"
            type="text"
            placeholder="50"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть місто, де перебуває авто"
            type="text"
            placeholder="Львів"
            name="town"
            value={this.state.town}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть тип коробки передач"
            type="text"
            placeholder="Автомат"
            name="transmission"
            value={this.state.transmission}
            onChange={this.onChange}
          />

          <TextFieldGroup
            label="Введіть тип двигуна"
            type="text"
            placeholder="Дизель 2.0"
            name="engine"
            value={this.state.engine}
            onChange={this.onChange}
          />

          <button type="submit" className="btn btn-lg btn-block info mt-4">
            Додати авто
          </button>
        </form>
        <br />
      </div>
    );
  }
}

AddCar.propTypes = {
  add: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { add }
)(withRouter(AddCar));
