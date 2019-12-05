import React, { Component, Redirect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Flash from './Flash';

class AdminProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption : this.props.category_id,
      messageFlash: '',
      image: '',
      error: ''
    };
  }

  componentDidMount() {
    const { fetchProduct } = this.props;
    fetchProduct(this.props.match.params.id);
  }

  handleChange = ({ target }) => {
    this.setState({
      selectedOption: target.value,
    });
  }

  render() {
    let { id, name, price, quantity, categories, image, error } = this.props;
    let messageFlash = this.state.messageFlash;
    if (this.props.image != undefined){
      image = this.props.image.url
    }

    const handleSubmit = e => {
      e.preventDefault();
      const formData = new FormData();
      const file = document.querySelector('[type=file]').files[0];
      if (file) formData.append('product[image]', file);

      formData.append('product[name]', document.getElementById('name').value);
      formData.append('product[price]', document.getElementById('price').value);
      formData.append('product[quantity]', document.getElementById('quantity').value);
      formData.append('product[category_id]', document.getElementById('category_id').value);
      this.props.updateProduct({ formData: formData, id: id });
      if (error != ""){
        this.setState({ messageFlash: 'Update successfully' });
      }
      else{
        this.setState({ messageFlash: error.map(e => ( e )) });
        return ;
      }
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
          <h1> Update product</h1>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const productState = state.editProduct;
  const categories = state.editProduct.categories
  const { id, name, category_id, price, quantity, image, error} = productState.product
  return {
    id, name, category_id, price, quantity, image, categories, error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (data) => {
      dispatch(actions.fetchProduct(data));
    },
    updateProduct: data => {
      dispatch(actions.updateProduct(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductEdit);
