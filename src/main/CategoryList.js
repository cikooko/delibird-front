import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
  justify-items: center;
  align-items: center;
`;

const CategoryItem = styled.div`
  width: 200px;
  height: 240px; // 이미지 높이와 이름을 포함한 총 높이
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // 상단 정렬
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px; // 원하는 이미지 높이로 설정
  object-fit: cover; // 이미지를 컨테이너에 맞추어서 채우기
`;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/store?category=${category}`);
  };

  return (
    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryItem key={index} onClick={() => handleCategoryClick(category.name)}>
          <StyledImage src={`http://api.delibird.store${category.image}`} alt={category.name} />
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

export default CategoryList;
