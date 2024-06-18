import React from 'react';
import './Login.css'; 
import naverLoginImg from '../img/login/naver.jpg';
import kakaoLoginImg from '../img/login/kakao.jpg';
import googleLoginImg from '../img/login/google.jpg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    try {
      const response = await fetch(`http://api.delibird.store/login/dev`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const authToken = response.headers.get('Auth');
        if (authToken) {
          Cookies.set('Auth', authToken, { path: '/' }, { sameSite: 'None' });
          navigate('/'); // 홈 화면으로 이동
        } else {
          console.error('Auth token not found in response headers.');
        }
      } else {
        console.error('Failed to login:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 화면으로 이동
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="my-bg">
        <h3 className="font-shadow">Login Here</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '30px' }}>
          <div style={{ width: '70%' }}>
            <img className="login_btn" src={naverLoginImg} onClick={() => window.location.href='http://api.delibird.store/oauth2/authorization/naver'} alt="네이버 로그인" />
            <img className="login_btn" src={kakaoLoginImg} onClick={() => window.location.href='http://api.delibird.store/oauth2/authorization/kakao'} alt="카카오 로그인" />
            <img className="login_btn" src={googleLoginImg} onClick={() => window.location.href='http://api.delibird.store/oauth2/authorization/google'} alt="구글 로그인" />
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h4>
            <a href="#" onClick={handleGoBack} className="font-shadow">
              ← 돌아가기
            </a>
          </h4>
        </div>
        <button type="button" onClick={handleTestLogin} className="login_btn" style={{ marginTop: '20px' }}>
          테스트 로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
