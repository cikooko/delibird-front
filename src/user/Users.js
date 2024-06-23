import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Users() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = Cookies.get('Auth');
        if (authToken) {
          const response = await fetch(`https://api.delibird.store/users`, {
            credentials: 'include',
            headers: {
              "Auth": getCookie("Auth")
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

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>User ID: {userInfo.userId}</p>
      <p>Nickname: {userInfo.nickname}</p>
      <p>Phone: {userInfo.phone}</p>
      <p>Status: {userInfo.status}</p>
      <p>Region Code: {userInfo.regionCode}</p>
      <p>Zip Code: {userInfo.zipCode}</p>
      <p>Address: {userInfo.address}</p>
    </div>
  );
}

export default Users;
