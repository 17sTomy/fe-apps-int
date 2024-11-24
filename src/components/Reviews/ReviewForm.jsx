import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newReview);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          value={newReview.rating}
          min="1"
          max="5"
          onChange={(e) =>
            setNewReview({ ...newReview, rating: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Comment:
        <textarea
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;