import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './../css/Product.css';
import Flash from './Flash';

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
      messageFlash: ''
    }
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { currentPage, products, totalPage } = this.props;
    let arrPages = [];
    let messageFlash = this.state.messageFlash;

    for(let page = 1; page <= totalPage; page++) {
      arrPages.push(page);
    }


    const handleClickDelete = (event, productId, productName) => {
      if (window.confirm('Confirm delete product "' + productName + '" ?')) {
        event.preventDefault();
        this.props.deleteProduct(productId, currentPage);
        this.setState({ messageFlash: 'Deleted successfully' });
      }
    };

    const RowProduct = () => (products.map( product => (
      <tr key={product.id + product.name}>
        <th scope="row">{product.id}</th>
        <td>{product.category_name}</td>
        <td className="img-product"><img src={product.image.url} alt={product.name} /></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td><Link type="button" className="btn btn-primary" to={`/admin/products/${product.id}/`} >Edit</Link></td>
        <td>
          <button type="button" className="btn btn-danger" 
            onClick={ event => handleClickDelete(event, product.id, product.name) }
            data-toggle="modal">
            Delete
          </button>
        </td>
      </tr>
    )));

    const handleClickPaginate = ({ page }) => {
      this.props.setCurrentPage(page);
      this.props.fetchProducts({ page });
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-4 admin-title">Products</h1>
            <Link type="button" to="/admin/products/new" className="btn btn-primary">Add new product</Link>
            <br></br>
            <br></br>
            <Flash type="success" message={messageFlash} />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product's Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col" colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                <RowProduct />
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <nav aria-label="Page navigation example">
              <ul className="justify-content-center pagination">
                <Pagination currentPage={currentPage} arrPages={arrPages} handleClickPaginate={handleClickPaginate} />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const adminState = state.adminProducts;

  return {
    currentPage: adminState.currentPage,
    products: adminState.products,
    totalPage: adminState.total_pages
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: (page) => {
      dispatch(actions.fetchProducts(page));
    },
    setCurrentPage: page => {
      dispatch(actions.setCurrentPage(page))
    },
    deleteProduct: (productId, page) => {
      dispatch(actions.deleteProduct({ productId: productId, page: page }))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
