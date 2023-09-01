import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./businessCard.css";

const BusinessCard = ({ loadedBusiness }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [business, setBusiness] = useState(null);
  const [rating, setRating] = useState(1);
  const history = useHistory();
  const currentDate = new Date();
  let dayNumber = currentDate.getDay();
  dayNumber = (dayNumber + 6) % 7;

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        setBusiness(loadedBusiness);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading business:", error);
        setIsLoaded(false);
      }
    };
    loadBusiness();
  }, [dispatch, business]);

  useEffect(()=>{
    if(business){
      const rating = business.reviews.reduce((acc, review) => acc + review.stars, 0)/business.reviews.length
      setRating(rating ? Math.round(rating * 10) / 10 : 1);
    }
  }, [business, dispatch])

  const redirectToBusiness = () => {
    if (business) {
      history.push(`/business/${business.id}`);
    }
  };

  return (
    <div className="businessCard" onClick={redirectToBusiness}>
      {!isLoaded && <h2>LOADING</h2>}
      {isLoaded && business && (
        <>
          <img
            src={business?.images?.filter((img) => img.preview === true)[0]?.url}
            alt="No business found"
          />
          <div className="cardRight">
            <h2>{business.name}</h2>
            <div className = "businessCardReview">
              <div className="reviewListItem-stars">
                <div
                  className="filled"
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={rating >= 2 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={rating >= 3 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={rating >= 4 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={rating >= 5 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>{rating}</p>
                <p className="totalReviews">{business.reviews.length} review(s)</p>
              </div>
            </div>
            <div className="businessCardCategories">
              {business.categories.map((category)=>(
                <p key={category.category}>{category.category}</p>
              ))}
              {[...Array(business?.price)].map((e, i) => <i key={i} className="fa-solid fa-dollar"></i>)}
            </div>
            <div className="businessCardHours">
                {business.hours[dayNumber]?.close_time && <p>Open until {business.hours[dayNumber].close_time}</p>}
                {!business.hours[dayNumber]?.close_time && <p>CLOSED</p>}
            </div>
            <div className="businessCardReview">
                <p>"{business?.reviews[0]?.review}"</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessCard;
