import React, { useState, useEffect } from "react";
// import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./ReviewForm.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const [currReview, setCurrReview] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const { reviewId } = useParams(null);

  useEffect(() => {
    const getReview = async () => {
      const getCurrReview = await fetch(`/api/review/${reviewId}`);
      const data = await getCurrReview.json();
      setCurrReview(data);
    };
    getReview();
  }, []);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateReview = await fetch(`/api/review/${reviewId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stars: starRating,
          review,
          userId,
          businessId: currReview.businessId
        })
    })
    return updateReview;
    // TO-DO: ERROR HANDLING
  };

  return (
    <>
      <div className="review-form-container">
        <div className="review-form-header">
          <span className="header">Business Name</span>
          <span className="blue-link">Read our review guidelines</span>
        </div>
        <div className="review-form">
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="star-rating">
              {[...Array(5)].map((star, idx) => {
                idx += 1;
                return (
                  <button
                    type="button"
                    key={idx}
                    className={
                      idx <= starRating ? "red-button-small on" : "off"
                    }
                    onClick={() => setStarRating(idx)}
                    onMouseEnter={() => setStarRating(idx)}
                    onMouseLeave={() => setStarRating(idx)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
            <textarea
              placeholder="Leave your review here..."
              name="review"
              rows="8"
              cols="40"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <h2>Attach Photos</h2>
            <button type="submit">Post Review</button>
          </form>
        </div>
      </div>
    </>
  );
}
