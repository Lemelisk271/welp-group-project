import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../store/businesses";
import "./Businesses.css";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
//   const [business, setBusiness] = useState(null);
  const { id } = useParams();
  const business = useSelector(state => state.business.singleBusiness)

  useEffect(() => {
    try {
      dispatch(getBusiness(id));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
}, dispatch);

return (
    <>
      <h1>Business Details</h1>
    {business && console.log("BUSINESS", business)}
      {business && <h2>Name: {business.name}</h2>}
      {business && <h2>url: {business.url}</h2>}
      {business && <h2>phone: {business.phone}</h2>}
      {business && (
        <h2>
          address: {business.address} {business.city}, {business.state}{" "}
          {business.zip_codes}
        </h2>
      )}
      {business && <h2>about: {business.about}</h2>}
      {business && <h2>price: {business.price}</h2>}
      {business && <h2>owner: {business.ownerId}</h2>}
    </>
  );
};

export default BusinessDetails;
