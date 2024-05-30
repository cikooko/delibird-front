import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 60%;
  padding: 10px;
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="검색어를 입력하세요" />
    </SearchBarContainer>
  );
};

export default SearchBar;
