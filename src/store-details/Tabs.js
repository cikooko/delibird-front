import React from 'react';

const Tabs = ({ currentTab, setCurrentTab }) => (
  <div className="tabs">
    <div className={`tab ${currentTab === 'menu' ? 'active' : ''}`} onClick={() => setCurrentTab('menu')}>메뉴</div>
    <div className={`tab ${currentTab === 'review' ? 'active' : ''}`} onClick={() => setCurrentTab('review')}>리뷰</div>
    <div className={`tab ${currentTab === 'info' ? 'active' : ''}`} onClick={() => setCurrentTab('info')}>매장 정보</div>
  </div>
);

export default Tabs;
