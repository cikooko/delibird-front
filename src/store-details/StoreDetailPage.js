import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header/Header'
import StoreDetail from './StoreDetail';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await fetch(`http://api.delibird.store/stores/${storeId}`, {
          credentials: 'include',
          headers: {
            "Auth": getCookie("Auth")
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStore(data);
      } catch (error) {
        console.error('Fetching store details failed:', error);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  return (
    <div className="container">
      <Header/>
      {store ? (
        <StoreDetail store={store} />
      ) : (
        <p>매장 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default StoreDetailPage;
