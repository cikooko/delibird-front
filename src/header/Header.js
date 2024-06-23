import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../img/Logo.png';
import Cookies from 'js-cookie';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #ff4442;
  color: #fff;
`;

const Logo = styled.img`
  width: 96px;
  height: 54px;
`;

const HeaderLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  text-align: center;
`;

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = Cookies.get('Auth');
        console.log(authToken);
        if (authToken) {
          const response = await fetch(`https://api.delibird.store/users`, {
            credentials: 'include',
            headers: {
              "Auth": Cookies.get("Auth")
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          } else {
            console.error('Failed to fetch user info:', response.statusText);
          }
        } else {
          console.error('Auth token not found in cookies.');
        }
      } catch (error) {
        console.error('Error occurred while fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    Cookies.remove('Auth');
    navigate('/');
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    // window.location.href = '/'; // React Router를 사용하지 않는 경우
  };

  return (
    <HeaderContainer>
      <Logo src={logoImage} alt="로고" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
      {userInfo ? (
        <div>
          <HeaderLink to="/users">내 정보</HeaderLink>
          <HeaderLink to="#" onClick={handleLogout}>로그아웃</HeaderLink>
        </div>
      ) : (
        <HeaderLink to="/login">로그인</HeaderLink>
      )}
      {showLogoutModal && (
        <Modal>
          <ModalContent>
            <h3>로그아웃 하시겠습니까?</h3>
            <button onClick={confirmLogout}>확인</button>
            <button onClick={cancelLogout}>취소</button>
          </ModalContent>
        </Modal>
      )}
    </HeaderContainer>
  );
};

export default Header;