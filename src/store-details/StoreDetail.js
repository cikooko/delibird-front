import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from './Menu';
import Review from './Review';
import Info from './Info';
import Tabs from './Tabs';
import './StoreDetail.css';

const StoreDetail = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [currentTab, setCurrentTab] = useState('menu');
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await fetch(`http://api.delibird.store/stores/${storeId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStore(data);
      } catch (error) {
        console.error('Fetching store detail failed:', error);
      }
    };

    fetchStoreDetail();
  }, [storeId]);

  const handleAddToOrder = (menuItem) => {
    setOrderItems([...orderItems, menuItem]);
  };

  if (!store) {
    return <p>매장 정보를 불러오는 중...</p>;
  }

  return (
    <div className="store-container">
      <div className="store-detail">
        <div className="store-box">
          <img src={store.logoImage} alt={`${store.name} 로고`} className="store-image" />
          <div className="store-description">
            <h1>{store.name}</h1>
            <p>{store.description}</p>
            <p>주소: {store.roadAddress}</p>
            <p>전화번호: {store.tel}</p>
            <p>배달비: {store.deliveryFees}원</p>
          </div>
        </div>
        <OrderBox orderItems={orderItems} />
      </div>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TabContent currentTab={currentTab} store={store} storeId={storeId} onAddToOrder={handleAddToOrder} />
    </div>
  );
};

const OrderBox = ({ orderItems }) => (
  <div className="order-box">
    <h2>주문표</h2>
    <ul className="order-list">
      {orderItems.map((item, index) => (
        <li key={index}>{item.name} - {item.price}원</li>
      ))}
    </ul>
    <div className="order-total">합계: {orderItems.reduce((total, item) => total + item.price, 0)}원</div>
    <button className="order-button">주문 하기</button>
  </div>
);

const TabContent = ({ currentTab, store, storeId, onAddToOrder }) => {
  switch (currentTab) {
    case 'menu':
      return <Menu products={store.productList} onAddToOrder={onAddToOrder} />;
    case 'review':
      return <Review storeId={storeId} />; 
    case 'info':
      return <Info store={store} />;
    default:
      return <div>탭을 선택하세요</div>;
  }
};

export default StoreDetail;
