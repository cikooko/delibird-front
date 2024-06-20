import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import Review from './Review';
import Info from './Info';
import Tabs from './Tabs';
import OrderBox from './OrderBox';
import './StoreDetail.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const StoreDetail = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [currentTab, setCurrentTab] = useState('menu');
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await fetch(`http://api.delibird.store/stores/${storeId}`, {
          credentials: 'include',
          headers: {
            "Auth": getCookie("Auth")
          },
        });
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
    const existingItem = orderItems.find((item) => item.id === menuItem.id);
    if (existingItem) {
      handleUpdateOrderQuantity(existingItem, existingItem.quantity + 1);
    } else {
      setOrderItems([...orderItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (menuItem) => {
    setOrderItems(orderItems.filter((item) => item.id !== menuItem.id));
  };

  const handleUpdateOrderQuantity = (menuItem, quantity) => {
    setOrderItems(
      orderItems.map((item) => (item.id === menuItem.id ? { ...item, quantity } : item))
    );
  };

  const handleGoToOrder = () => {
    navigate(`/orderpage`, { state: { orderItems } });
  };

  if (!store) {
    return <p>매장 정보를 불러오는 중...</p>;
  }

  if (!store.logoImage || store.logoImage.length === 0) {
    store.logoImage = "https://zrr.kr/acvx";
  } else if (!store.logoImage.startsWith("http://") && !store.logoImage.startsWith("https://")) {
    store.logoImage = "http://api.delibird.store" + store.logoImage;
  }

  return (
    <div className="store-container">
      <div className="store-detail">
        <div className="store-box">
          <div className="store-description">
            <h1>{store.name}</h1>
            <p>{store.description}</p>
            <p>주소: {store.roadAddress}</p>
            <p>전화번호: {store.tel}</p>
            <p>배달비: {store.deliveryFees}원</p>
          </div>
          <img src={store.logoImage} className="store-image" width={500} />
        </div>
        <OrderBox
          orderItems={orderItems}
          onRemoveFromOrder={handleRemoveFromOrder}
          onUpdateOrderQuantity={handleUpdateOrderQuantity}
          onGoToOrder={handleGoToOrder}
          storeId={storeId}
        />
      </div>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TabContent
        currentTab={currentTab}
        store={store}
        storeId={storeId}
        onAddToOrder={handleAddToOrder}
      />
    </div>
  );
};

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
