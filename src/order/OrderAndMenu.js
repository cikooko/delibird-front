import React, { useState, useEffect } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const OrderAndMenu = () => {
  const [cartData, setCartData] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`https://api.delibird.store/cart`, {
          credentials: 'include',
          headers: {
            "Auth": getCookie("Auth")
          },
        });
        setCartData(response.data);
        setOrderItems(
          Object.entries(response.data.productQuantityMap).map(([productId, quantity]) => ({
            id: productId,
            quantity,
          }))
        );
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();
  }, []);

  const onUpdateOrderQuantity = (item, newQuantity) => {
    setOrderItems(
      orderItems.map((orderItem) =>
        orderItem.id === item.id ? { ...orderItem, quantity: newQuantity } : orderItem
      )
    );
  };

  const onRemoveFromOrder = (item) => {
    setOrderItems(orderItems.filter((orderItem) => orderItem.id !== item.id));
  };

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-and-menu">
      <div className="order-box">
        <h2>주문표</h2>
        <ul className="order-list">
          {orderItems.map((item) => (
            <li key={item.id}>
              {/* 여기에 제품 정보를 표시하세요 */}
              {/* 예: 제품 이름, 가격, 수량 등 */}
              {item.quantity}개
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => onUpdateOrderQuantity(item, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  className="quantity-button"
                  onClick={() => onUpdateOrderQuantity(item, item.quantity + 1)}
                >
                  +
                </button>
                <button className="remove-button" onClick={() => onRemoveFromOrder(item)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="order-total">
          합계:{' '}
          {orderItems.reduce((total, item) => total + item.quantity, 0)}
          개
        </div>
      </div>

      <div className="menu-section">
        {/* 메뉴 섹션 */}
        {Object.entries(cartData.productQuantityMap).map(([productId, quantity]) => (
          <div className="menu-item" key={productId}>
            {/* 제품 정보 표시 */}
            <div className="quantity-controls">
              <button
                className="quantity-button"
                onClick={() => onUpdateOrderQuantity({ id: productId }, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => onUpdateOrderQuantity({ id: productId }, quantity + 1)}
              >
                +
              </button>
              <button className="remove-button" onClick={() => onRemoveFromOrder({ id: productId })}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderAndMenu;
