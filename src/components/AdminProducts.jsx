import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
    }
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { currentPage, products, totalPage } = this.props;
    let arrPages = [];

    for(let page = 1; page <= totalPage; page++) {
      arrPages.push(page);
    }

    const RowProduct = () => (products.map( product => (
      <tr key={product.id + product.name}>
        <th scope="row">{product.id}</th>
        <td>{product.category_name}</td>
        <td><img src={product.image} alt={product.name} /></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td><Link to="#">Edit</Link></td>
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product's Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Edit</th>
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
    setCurrentPage: page => dispatch(actions.setCurrentPage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
