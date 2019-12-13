import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Flash from '../Flash';

class DetailOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFlash: ''
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount(){
    const { fetchDetailOrders } = this.props
    fetchDetailOrders(this.props.match.params.id);
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    let detailOrders = this.props.detailOrders

    const RowOrder = () => (detailOrders.map( detail => (
      <tr key={detail.id + detail.order_id}>
        <th scope="row">{detail.id}</th>
        <td>{detail.order_id}</td>
        <td>{detail.product_name}</td>
        <td>{detail.price}</td>
        <td>{detail.quantity}</td>
        <td>{detail.total}</td>
      </tr>
    )));

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-4 admin-title">Detail Orders</h1>
            <button className="btn btn-primary" onClick={this.goBack}>Go Back</button>
            <br></br>
            <br></br>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <RowOrder />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const orderState = state.detailOrders;
  return {
    detailOrders: orderState.detailOrders,
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    fetchDetailOrders: (data) => {
      dispatch(actions.fetchDetailOrders(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrders);
