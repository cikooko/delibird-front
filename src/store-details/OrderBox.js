import React from 'react';
import './StoreDetail.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const OrderBox = ({
  orderItems,
  onRemoveFromOrder,
  onUpdateOrderQuantity,
  onGoToOrder,
  storeId,
}) => {

  const handleSaveCart = async () => {
    const productQuantityMap = {};
    orderItems.forEach((item) => {
      productQuantityMap[item.id.toString()] = item.quantity;
    });

    try {
      const response = await fetch(`http://api.delibird.store/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Auth": getCookie("Auth"),
        },
        body: JSON.stringify({
          storeId,
          productQuantityMap,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Cart saved successfully');
      } else {
        console.error('Error saving cart:', await response.json());
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  return (
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
      <div className="cart-actions">
        <button className="save-cart-button" onClick={handleSaveCart}>
          장바구니 담기
        </button>
        <button className="order-button" onClick={onGoToOrder}>
          장바 구니
        </button>
      </div>
    </div>
  );
};

export default OrderBox;
