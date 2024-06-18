import React from 'react';

const OrderBox = ({
  orderItems,
  onRemoveFromOrder,
  onUpdateOrderQuantity,
  onGoToOrder,
}) => (
  <div className="order-box">
    <h2>주문표</h2>
    <ul className="order-list">
      {orderItems.map((item) => (
        <li key={item.id}>
          {item.name} - {item.price}원
          <div className="quantity-controls">
            <button
              className="quantity-button"
              onClick={() => onUpdateOrderQuantity(item, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              className="quantity-button"
              onClick={() => onUpdateOrderQuantity(item, item.quantity + 1)}
            >
              +
            </button>
            <button
              className="remove-button"
              onClick={() => onRemoveFromOrder(item)}
            >
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
    <div className="order-total">
      합계:{' '}
      {orderItems.reduce((total, item) => total + item.price * item.quantity, 0)}
      원
    </div>
    <button className="order-button" onClick={onGoToOrder}>
      장바 구니
    </button>
  </div>
);

export default OrderBox;
