import React from 'react';
import Header from '../header/Header'
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';
import EventBanner from './EventBanner';

function MainPage() {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <EventBanner/>
      <CategoryList/>
    </div>
  );
}

export default MainPage;
