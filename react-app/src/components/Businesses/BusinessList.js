import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllBusiness } from "../../store/business";
import BusinessCard from "./BusinessCard";

const BusinessList = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const business = useSelector(state=>state.business.allBusinesses);

  useEffect(()=>{
    dispatch(getAllBusiness())
  }, [dispatch])

  useEffect(()=>{
    if(Object.keys(business)){
      setIsLoaded(true);
    }
  }, [business])

  return (
    isLoaded && (
      <div className="businessList">
        {Object.values(business).map(business=>(
          <BusinessCard key={business.id} id={business.id}/>
        ))}
      </div>
    )
  )
}

export default BusinessList;
