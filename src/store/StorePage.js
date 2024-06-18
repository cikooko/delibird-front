import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/Header'
import CategorySelector from './CategorySelector';
import FilterOptions from './FilterOptions';
import StoreBox from './StoreBox';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const StorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('deliveryFees,asc');
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');

    // 카테고리 정보 가져오기
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://api.delibird.store/categories`, {
          credentials: "include",
          headers: {
            "Auth": getCookie("Auth")
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);

        // 선택된 카테고리 설정
        const matchedCategory = data.find(category => category.name === categoryParam);
        setSelectedCategory(matchedCategory || null);
      } catch (error) {
        console.error('Fetching categories failed:', error);
      }
    };
    fetchCategories();
  }, [location]);

  useEffect(() => {
    const fetchStoresByCategory = async () => {
      if (!selectedCategory) return;
      const page = 1;
      const size = 10;
      try {
        const response = await fetch(`http://api.delibird.store/stores?page=${page}&size=${size}&sort=${sortOrder}&categoryId=${selectedCategory.id}`, {
          credentials: "include",
          headers: {
            "Auth": getCookie("Auth")
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error('Fetching stores failed:', error);
      }
    };

    fetchStoresByCategory();
  }, [selectedCategory, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'deliveryFees,asc' ? 'name,desc' : 'deliveryFees,asc'));
  };

  const handleStoreClick = (storeId) => {
    navigate(`/stores/${storeId}`);
  };

  return (
    <div className="container">
      <Header address="서울시 강남구" name="홍길동" />
      <CategorySelector
        categories={categories.map(category => category.name)}
        selectedCategory={selectedCategory ? selectedCategory.name : null}
        onSelectCategory={(categoryName) => {
          const selectedCategory = categories.find(category => category.name === categoryName);
          setSelectedCategory(selectedCategory);
        }}
      />
      <FilterOptions sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
      <div className="store-list">
        {stores.length > 0 ? (
          stores.map(store => (
            <div key={store.id} onClick={() => handleStoreClick(store.id)} style={{ cursor: 'pointer' }}>
              <StoreBox store={{ ...store, imageUrl: encodeURIComponent(store.imageUrl) }} />
            </div>
          ))
        ) : (
          <p>매장 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default StorePage;
