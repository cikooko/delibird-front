import React from 'react';

const StoreBox = ({ store }) => {
  return (
    <div className="store-item">
      <img src={store.logoImage || 'default-image-path.png'} alt={store.name} className="store-image" />
      <div className="store-description">
        <h3>{store.name}</h3>
        <p>{store.description}</p>
        <p>배달료: {store.deliveryFees}원</p>
      </div>
    </div>
  );
};

export default StoreBox;
