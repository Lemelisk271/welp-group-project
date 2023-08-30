import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../store/business";
import { useHistory } from "react-router-dom";

const BusinessCard = ({ id }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [business, setBusiness] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const loadedBusiness = await dispatch(getBusiness(id));
        setBusiness(loadedBusiness);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading business:", error);
        setIsLoaded(true);
      }
    };
    loadBusiness();
  }, [dispatch, id]);

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
            alt="No business image found"
          />
          <div className="cardRight">
            <h2>{business.name}</h2>
            <div className="cardRating">

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessCard;
