import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./ReviewForm.css";

export default function ReviewForm({ isUpdate }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [currReview, setCurrReview] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const [review, setReview] = useState("");
    const [frontEndErrors, setFrontEndErrors] = useState({});
    const [errors, setErrors] = useState([]);
    const { reviewId, id } = useParams(null);
    const history = useHistory();

    useEffect(() => {
        if (isUpdate) {
            const getReview = async () => {
                const getCurrReview = await fetch(`/api/review/${reviewId}`);
                const data = await getCurrReview.json();
                setCurrReview(data);
                setStarRating(data.stars);
                setReview(data.review);
            };
            getReview();
        } else {
        }
        // eslint-disable-next-line
    }, [isUpdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = {};

        if (!starRating) {
            error.stars = "Review must contain a star rating.";
        }
        if (starRating < 1 || starRating > 5) {
            error.stars =
                "Please select between 1 and 5 stars for this review.";
        }
        if (!review.length) {
            error.review = "Review cannot be empty.";
        }
        if (review.length > 2000) {
            error.review = "Review must be less than 2000 characters long.";
        }

        setFrontEndErrors(error);

        if (Object.values(frontEndErrors).length > 0) {
            return;
        }

        if (isUpdate && !Object.values(frontEndErrors).length) {
            const updateReview = await fetch(`/api/review/${reviewId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stars: starRating,
                    review,
                    userId: sessionUser.id,
                    businessId: currReview.businessId,
                }),
            });
            const data = await updateReview.json();
            if (data) {
                setErrors(data.errors);
            } else {
                return history.push(`/business/${currReview.businessId}`);
            }
        } else {
            const createReview = await fetch(`/api/business/${id}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stars: starRating,
                    review,
                    userId: sessionUser.id,
                    businessId: id,
                }),
            });
            if (createReview.errors) {
                setErrors(createReview.errors);
            } else {
                return history.push(`/business/${id}`);
            }
        }
    };

    const deleteReview = async (e) => {
        e.preventDefault();
        const deleteReview = await fetch(`/api/review/${reviewId}`, {
            method: "DELETE",
        });
        const data = await deleteReview.json();
        if (data) {
            setErrors(data.errors);
        } else {
            return history.push(`/business/${currReview.businessId}`);
        }
    };

    if (!sessionUser || sessionUser === null) {
        return <Redirect to="/not-logged-in" />;
    }

    return (
        <>
            <div className="review-form-container">
                <div className="review-form">
                    <div className="review-form-header">
                        <h2 className="header">NEW REVIEW</h2>
                        <span className="blue-link">
                            Read our review guidelines
                        </span>
                    </div>
                    <div className="review-form-input">
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, i) => (
                                <li className="profileForm-errors" key={i}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                        <label>
                            <h4>{frontEndErrors.stars}</h4>
                        </label>
                        <div className="star-rating">
                            {[...Array(5)].map((star, idx) => {
                                idx += 1;
                                return (
                                    <button
                                        type="button"
                                        key={idx}
                                        className={
                                            idx <= starRating
                                                ? "red-button-small on"
                                                : "off"
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
                        <label>
                            <h4>{frontEndErrors.review}</h4>
                        </label>
                        <textarea
                            placeholder="A few things to consider in your review&#10;Service Requested, Quality, Value"
                            name="review"
                            rows="8"
                            cols="40"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <h2>Attach Photos</h2>
                        <button
                            className="big-red-button"
                            type="submit"
                            disabled={
                                !starRating ||
                                !review.length ||
                                errors.review ||
                                errors.stars
                            }
                        >
                            Post Review
                        </button>
                        {isUpdate && (
                            <button
                                className="big-red-button"
                                onClick={deleteReview}
                            >
                                Delete Review
                            </button>
                        )}
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}
