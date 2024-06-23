import React, { useEffect, useState } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const Review = ({ storeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://api.delibird.store/reviews/${storeId}`, {
          credentials: 'include',
          headers: {
            "Auth": getCookie("Auth")
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // 리뷰 데이터가 배열인지 확인하고, 그렇지 않으면 빈 배열로 초기화
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetching reviews failed:", error);
        setReviews([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchReviews();
  }, [storeId]);

  return (
    <div className="review-section">
      <h3>리뷰</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-author">Rating: {review.rating}</div>
            <div className="review-content">{review.review}</div>
            <div className="review-images">
              {review.image1 && <img src={review.image1} alt="Review Image 1" />}
              {review.image2 && <img src={review.image2} alt="Review Image 2" />}
              {review.image3 && <img src={review.image3} alt="Review Image 3" />}
            </div>
            {review.created_At && <div className="review-date">Created: {new Date(review.created_At).toLocaleDateString()}</div>}
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default Review;
