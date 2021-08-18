import React from 'react';
import './shopping-cart-table.css';
import { allBookRemovedFromCart, bookRemovedFromCart, itemAddedToCart } from '../../actions';
import { connect } from'react-redux';

const ShoppingCartTable = (props) => {
  const {cartItems, orderTotal, onIncrease, onDeacrease, onDelete} = props;

  const renderCartItem = (item, idx) => {
    const {id, name, count, total} = item;
    return(
      <tr key={id}>
      <td>{idx+1}</td>
      <td>{name}</td>
      <td>{count}</td>
      <td>{total}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm float-right" onClick={()=>onDelete(id)}>
          <i className="fa fa-trash-o" />
        </button>
        <button className="btn btn-outline-success btn-sm float-right" onClick={()=>onIncrease(id)}>
          <i className="fa fa-plus-circle" />
        </button>
        <button className="btn btn-outline-warning btn-sm float-right" onClick={()=>onDeacrease(id)}>
          <i className="fa fa-minus-circle" />
        </button>
      </td>
    </tr>
    )
  }

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(renderCartItem)}
        </tbody>
      </table>

      <div className="total">
        {`Total: ${orderTotal}`}
      </div>
    </div>
  );
};

const mapStateToProps = ( { shopingCart: {cartItems, orderTotal} } ) => {
  return {
    cartItems,
    orderTotal
  }
}

const mapDispatchToProps = {
  onIncrease: itemAddedToCart,
  onDeacrease: bookRemovedFromCart,
  onDelete: allBookRemovedFromCart
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
