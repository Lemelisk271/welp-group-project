import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../store/business";
import "./Businesses.css";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const business = useSelector((state) => state.business.singleBusiness);

  useEffect(
    () => {
      try {
        dispatch(getBusiness(id));
        setIsLoaded(true);
      } catch (error) {}
    },
    // eslint-disable-next-line
    [dispatch, isLoaded]
  );

  return (
    <>
      <h1>Business Details</h1>
      {business && console.log("BUSINESS", business)}
      {business && <h2>Name: {business.name}</h2>}
      {business && <h2>Website: {business.url}</h2>}
      {business && <h2>Phone: {business.phone}</h2>}
      {business && (
        <h2>
          Address: {business.address} {business.city}, {business.state}{" "}
          {business.zip_codes}
        </h2>
      )}
      {business && <h2>About: {business.about}</h2>}
      {business && <h2>Price: {business.price}</h2>}
      {business && <h2>Owner: {business.ownerId}</h2>}
      {business && (
        <h2>
          Images:{" "}
          {business.images.map((element) => {
            return (
              <ul>
                <li key={element.id}>{element.url}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Reviews:{" "}
          {business.reviews.map((element) => {
            return (
              <ul>
                <li key={element.id}>
                  {element.date} - Stars: {element.stars} - {element.review}
                </li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Hours:{" "}
          {business.hours.map((element) => {
            return (
              <ul>
                <li key={element.id}>
                  {element.day} -{" "}
                  {(element.open_time && element.open_time + " -") || "Closed"}{" "}
                  {element.close_time}
                </li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Amenities:{" "}
          {business.amenities.map((element) => {
            return (
              <ul>
                <li key={element.id}>{element.amenity}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Categories:{" "}
          {business.categories.map((element) => {
            return (
              <ul>
                <li key={element.id}>{element.category}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Questions:{" "}
          {business.questions.map((element) => {
            return (
              <ul>
                <li key={element.id}>
                  {element.question}
                  {element.answers.length > 0 && (
                    <ul>
                      <li key={element.answers.id}>
                        {element.answers[0].answer}
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            );
          })}
        </h2>
      )}
    </>
  );
};

export default BusinessDetails;
