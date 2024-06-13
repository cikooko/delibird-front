// StorePage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import CategorySelector from './CategorySelector';
import FilterOptions from './FilterOptions';
import StoreBox from './StoreBox';

const categoryMapping = {
  dessert: { name: '디저트', id: '1'},
  japanese: { name: '돈까스/일식', id: '2'},
  pizza: { name: '피자', id: '3'},
  burger: { name: '버거', id: '4'},
  asian: { name: '중식/아시안', id: '5' },
  fastfood: { name: '패스트푸드', id: '6'},
  backban: { name: '백반/죽', id: '7' },
  late: { name: '야식', id: '9'},
  western: { name: '양식', id: '8'},
  sandwich: { name: '샌드위치', id: '10'},
  chicken: { name: '치킨', id: '11'},
  cafe: { name: '카페', id: '12'},
};

const categories = Object.values(categoryMapping).map(category => category.name);

const StorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('name,desc');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const matchedCategory = Object.keys(categoryMapping).find(key => key === categoryParam);
    setSelectedCategory(matchedCategory ? categoryMapping[matchedCategory] : null);
  }, [location]);

  useEffect(() => {
    const fetchStoresByCategory = async () => {
      if (!selectedCategory) return;
      const page = 1;
      const size = 10;
      try {
        const response = await fetch(`http://api.delibird.store/stores?page=${page}&size=${size}&sort=${sortOrder}&categoryId=${selectedCategory.id}`);
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
    setSortOrder(prevSortOrder => (prevSortOrder === 'name,desc' ? 'deliveryFees,asc' : 'name,desc'));
  };

  const handleStoreClick = (storeId) => {
    navigate(`/stores/${storeId}`);
  };

  return (
    <div className="container">
      <Header address="서울시 강남구" name="홍길동" />
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory ? selectedCategory.name : null}
        onSelectCategory={(categoryName) => {
          const categoryKey = Object.keys(categoryMapping).find(key => categoryMapping[key].name === categoryName);
          setSelectedCategory(categoryMapping[categoryKey]);
        }}
      />
      <FilterOptions sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
      <div className="store-list">
        {stores.length > 0 ? (
          stores.map(store => (
            <div key={store.id} onClick={() => handleStoreClick(store.id)} style={{ cursor: 'pointer' }}>
              <StoreBox store={store} />
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
