import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../store/business";
import "./Businesses.css";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();
  const business = useSelector((state) => state.business.singleBusiness);
  const user = useSelector((state) => state.session.user);

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

  useEffect(() => {
    if (user?.id === business?.ownerId) setIsOwner(true)
  }, [business, user]);


  return (
    <>
      <h1>Business Details</h1>
      <div>
        {business && <h2>Name: {business?.name}</h2>}
        {business && <h2>Website: {business?.url}</h2>}
        {business && <h2>Phone: {business?.phone}</h2>}
        {business && (
          <h2>
            Address: {business.address} {business.city}, {business.state}{" "}
            {business.zip_codes}
          </h2>
        )}
        {business && <h2>About: {business?.about}</h2>}
        {business && <h2>Price: {business?.price}</h2>}
        {business && <h2>Owner: {business?.ownerId}</h2>}
      </div>
      {business && (
        <h2>
          Images:{" "}
          {business?.images?.map((element) => {
            return (
              <ul key={element.id * 1.1}>
                <li>{element.url}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Reviews:{" "}
          {business?.reviews?.map((element) => {
            return (
              <ul key={element.id * 1.2}>
                <li>
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
          {business?.hours?.map((element) => {
            return (
              <ul key={element.id * 1.3}>
                <li>
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
          {business?.amenities?.map((element) => {
            return (
              <ul key={element.id * 1.4}>
                <li>{element.amenity}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Categories:{" "}
          {business?.categories?.map((element) => {
            return (
              <ul key={element.id * 1.5}>
                <li>{element.category}</li>
              </ul>
            );
          })}
        </h2>
      )}
      {business && (
        <h2>
          Questions:{" "}
          {business?.questions?.map((element) => {
            return (
              <ul key={element.id}>
                <li>
                  {element.question}
                  {element.answers.length > 0 && (
                    <ul>
                      <li key={element.answers.id * 1.6}>
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
      {isOwner && (
        <Link to={`/business/${id}/edit`}>
          <button>Edit Form</button>
        </Link>
      )}
    </>
  );
};

export default BusinessDetails;
