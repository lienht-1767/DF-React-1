import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';
import './../css/Product.css';
import Flash from './Flash';

class AdminProductNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFlash: ''
    }
  }

  componentDidMount() {
    const { newProduct } = this.props;
    newProduct();
  }

  render() {
    let { id, name, price, quantity, categories, image } = this.props;
    let messageFlash = this.state.messageFlash;

    const handleSubmit = e => {
      e.preventDefault();
      const formData = new FormData();
      const file = document.querySelector('[type=file]').files[0];
      if (file) formData.append('product[image]', file);

      formData.append('product[name]', document.getElementById('name').value);
      formData.append('product[price]', document.getElementById('price').value);
      formData.append('product[quantity]', document.getElementById('quantity').value);
      formData.append('product[category_id]', document.getElementById('category_id').value);
      this.props.createProduct({ formData: formData});
      this.setState({ messageFlash: 'Created successfully' });
    };

    const previewImage = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({ image: reader.result });
        };
        reader.readAsDataURL(file);
      } else {
        this.setState({ image: '' });
      }
    };

    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Flash type="success" message={messageFlash} />
          <h1>New product</h1>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue={name}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="price"
                defaultValue={price}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="quantity"
                defaultValue={quantity}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              Image
            </label>
            <div className="col-sm-10 Profile-upload-image">
              <div className="Profile-image">
                <img src={image} />
              </div>
              <div className="Profile-browser col-sm-10">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image"
                  onChange={previewImage}
                />
                <label className="custom-file-label" htmlFor="image">
                  Choose file
                </label>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="role" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
            <select
              id="category_id"
              className="form-control"
              value={this.props.selectedOption}
              onChange={this.handleChange}
              >
              {categories.map(({ id, name }) => <option key={id} value={id} >{name}</option>)}
            </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const categories = state.newProduct.categories
  return {
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newProduct: data => {
      dispatch(actions.newProduct(data));
    },
    createProduct: data => {
      dispatch(actions.createProduct(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductNew);
