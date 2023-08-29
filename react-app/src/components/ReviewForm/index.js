import React, { useState } from "react";
// import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./ReviewForm.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [starRating, setStarRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // }
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
                  className={idx <= starRating ? "red-button-small on" : "off"}
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
