import React from 'react';

const ReviewList = ({ reviews }) => (
  <ul>
    {reviews.map((review) => (
      <li key={review.id}>
        <strong>Rating:</strong> {review.rating} <br />
        <strong>Comment:</strong> {review.comment}
      </li>
    ))}
  </ul>
);

export default ReviewList;