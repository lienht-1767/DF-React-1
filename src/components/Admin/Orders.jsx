import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import Flash from '../Flash';
import callApi from '../../sagas/call_api';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
      messageFlash: ''
    };
  }

  componentDidMount(){
    const { fetchOrders } = this.props
    fetchOrders();
  }

  render() {
    const { currentPage, orders, totalPage } = this.props;
    let messageFlash = this.state.messageFlash;
    let arrPages = [];

    for(let page = 1; page <= totalPage; page++) {
      arrPages.push(page);
    }

    const handleClickDelete = (event, orderId) => {
      if (window.confirm('Confirm delete order ?')) {
        event.preventDefault();
        this.props.deleteOrder(orderId, currentPage);
        this.setState({ messageFlash: 'Deleted successfully' });
      }
    };

    const updateStatus = (event, id, status) => {
      let new_status = 0;
      if(status == "Approved")
      {
        new_status = 0
      }
      else{
        new_status = 1
      }

      if (window.confirm('Confirm update status order to ?')) {
        event.preventDefault();
        this.props.updateOrder(id, new_status);
        this.setState({ messageFlash: 'Update successfully' });
      }
    };

    const RowOrder = () => (orders.map( order => (
      <tr key={order.id + order.user_id}>
        <th scope="row">{order.id}</th>
        <td><button className="btn"  onClick={ event => updateStatus(event, order.id, order.status) }>{order.status}</button></td>
        <td>{order.user_name}</td>
        <td>{order.address}</td>
        <td>{order.phone}</td>
        <td>{order.total_money}</td>
        <td>{order.description}</td>
        <td><Link type="button" className="btn btn-primary" to={`/admin/orders/${order.id}/`} >Details</Link></td>
        <td>
          <button type="button" className="btn btn-danger" 
            onClick={ event => handleClickDelete(event, order.id) }
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
            <h1 className="my-4 admin-title">Orders</h1>
            <Flash type="success" message={messageFlash} />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">User name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Total money</th>
                  <th scope="col">Description</th>
                  <th scope="col" colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                <RowOrder />
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
  const orderState = state.adminOrders;

  return {
    currentPage: orderState.currentPage,
    orders: orderState.orders,
    totalPage: orderState.total_pages
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (page) => {
      dispatch(actions.fetchOrders(page));
    },
    deleteOrder: (orderId, page) => {
      dispatch(actions.deleteOrder({orderId: orderId, page: page}))
    },
    updateOrder: (orderId, status) => {
      dispatch(actions.updateOrder({orderId: orderId, status: status}))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
