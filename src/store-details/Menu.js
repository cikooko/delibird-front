import React from 'react';

const Menu = ({ products, onAddToOrder }) => (
  <div className="menu-section">
    <h3>인기 메뉴</h3>
    {products.map((product) => (
      <div className="menu-item" key={product.id}>
        <div className="menu-image">
          {product.image ? (
            <img
              src={"http://api.delibird.store" + product.image}
              alt={product.name}
              className={`image-size-${product.imageSize || 'default'}`}
              onError={(e) => {e.currentTarget.src = "https://zrr.kr/acvx"}}
            />
          ) : (
            '이미지 준비중'
          )}
        </div>
        <div className="menu-description">
          <h3>{product.name ? product.name : '이름 미정'}</h3>
          <p>{product.description}</p>
          <p>가격: {product.price}원</p>
          <button onClick={() => onAddToOrder(product)}>추가</button>
        </div>
      </div>
    ))}
  </div>
);

export default Menu;
