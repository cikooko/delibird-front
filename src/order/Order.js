import React, { useState } from 'react';
import styled from 'styled-components';

const Order = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      image: 'http://api.delibird.store/menu1.jpg',
      name: '치킨 버거',
      description: '바삭한 치킨 패티와 신선한 야채',
      price: 7000,
      quantity: 1,
      imageSize: 'default',
    },
    {
      id: 2,
      image: 'http://api.delibird.store/menu2.jpg',
      name: '콜라',
      description: '시원한 탄산음료',
      price: 2000,
      quantity: 1,
      imageSize: 'default',
    },
  ]);

  const [deliveryFee, setDeliveryFee] = useState(3000);

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalOrderAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalPaymentAmount = totalOrderAmount + deliveryFee;

  return (
    <Container>
      <MenuSection>
        <Title>장바구니</Title>
        {cart.map((item) => (
          <MenuItem key={item.id}>
            <MenuImage>
              <img
                src={item.image}
                alt={item.name}
                className={`image-size-${item.imageSize || 'default'}`}
                onError={(e) => {e.currentTarget.src = "https://zrr.kr/acvx"}}
              />
            </MenuImage>
            <MenuDescription>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>가격: {item.price}원</p>
              <QuantityControls>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button onClick={() => handleRemoveItem(item.id)}>삭제</button>
              </QuantityControls>
            </MenuDescription>
          </MenuItem>
        ))}
      </MenuSection>
      <PaymentInfo>
        <p>주문 금액: ₩{totalOrderAmount}</p>
        <p>배달비: ₩{deliveryFee}</p>
        <p>결제 예정 금액: ₩{totalPaymentAmount}</p>
        <OrderButton>주문하기</OrderButton>
      </PaymentInfo>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  margin: 0 auto;
`;

const MenuSection = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

const MenuItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
`;

const MenuImage = styled.div`
  flex: 0 0 100px;
  margin-right: 20px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const MenuDescription = styled.div`
  flex: 1;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-right: 10px;
  }
`;

const PaymentInfo = styled.div`
  flex: 0 0 300px;
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const OrderButton = styled.button`
  width: 100%;
  margin-top: 20px;
`;
