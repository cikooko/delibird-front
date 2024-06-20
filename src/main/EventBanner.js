import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BannerContainer = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const BannerItem = styled.div`
  img {
    width: 100%;
    height: auto;
    padding-bottom: 10px;
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const EventBanner = () => {
  return (
    <BannerContainer>
      <Slider {...settings}>
        <BannerItem>
          <img src="https://url.kr/849R6z" height={300} alt="이벤트1" />
        </BannerItem>
        <BannerItem>
          <img src="https://url.kr/lI5bG5" alt="이벤트2" />
        </BannerItem>
        {/* 여기에 더 많은 배너 아이템을 추가할 수 있습니다. */}
        
      </Slider>
    </BannerContainer>
  );
};

export default EventBanner;
