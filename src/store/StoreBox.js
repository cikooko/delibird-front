import React from 'react';

const StoreBox = ({ store }) => {
  if (!store.logoImage || store.logoImage.length === 0) {
    store.logoImage = "https://zrr.kr/acvx";
  } else if (!store.logoImage.startsWith("http://") && !store.logoImage.startsWith("https://")) {
    store.logoImage = "https://api.delibird.store" + store.logoImage;
  }
  
  return (
    <div className="store-item">
      <img src={store.logoImage} alt={store.name} className="store-image" />
      <div className="store-description">
        <h3>{store.name}</h3>
        <p>{store.description}</p>
        <p>배달료: {store.deliveryFees}원</p>
      </div>
    </div>
  );
};

export default StoreBox;
