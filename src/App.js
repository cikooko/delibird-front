import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import StorePage from './store/StorePage';
import StoreDetailPage from './store-details/StoreDetailPage';
import OrderPage from './order/OrderPage';
import Users from './user/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 메인 페이지를 루트 경로로 설정 */}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 라우트 */}
        <Route path="/store" element={<StorePage />} /> {/* 스토어 페이지 라우트 */}
        <Route path="/stores/:storeId" element={<StoreDetailPage />} /> {/* 스토어 디테일 페이지 라우트 */}
        <Route path="/order/:storeId" element={<OrderPage />} />
        <Route path="/users" element={<Users />} />
        {/* 필요에 따라 추가적인 라우트를 여기에 정의할 수 있습니다 */}
      </Routes>
    </Router>
  );
}

export default App;
