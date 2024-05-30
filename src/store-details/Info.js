import React from 'react';

const Info = ({ store }) => (
  <div className="info-section">
    <h3>매장 정보</h3>
    <div className="info-item">
      <div className="info-label">설명</div>
      <div className="info-value">{store.description || '설명이 없습니다.'}</div>
    </div>
    <div className="info-item">
      <div className="info-label">주소</div>
      <div className="info-value">{store.roadAddress || '서울시 강남구 ...'}</div>
    </div>
    <div className="info-item">
      <div className="info-label">전화번호</div>
      <div className="info-value">{store.tel || '02-123-4567'}</div>
    </div>
    <div className="info-item">
      <div className="info-label">배달비</div>
      <div className="info-value">{store.deliveryFees ? `${store.deliveryFees}원` : '정보 없음'}</div>
    </div>
    <div className="info-item">
      <div className="info-label">운영 시간</div>
      <div className="info-value">09시 - 21시 일요일 휴무</div>
    </div>
  </div>
);

export default Info;
