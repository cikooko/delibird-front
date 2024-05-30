import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImage from '../img/Logo.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #ff4442;
  color: #fff;
`;

const Logo = styled.img`
  width: 192px;
  height: 108px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logoImage} alt="로고" />
      <Link to="/login" style={{ color: '#FFF', textDecoration: 'none' }}>로그인</Link> 
    </HeaderContainer>
  );
};

export default Header;
