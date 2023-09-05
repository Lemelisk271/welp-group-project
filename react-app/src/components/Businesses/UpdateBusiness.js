import { useParams, useHistory } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBusiness } from "../../store/business";

const UpdateBusiness = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const curr_business = useSelector((state) => state.business?.singleBusiness);
  const userId = useSelector((state) => state.session?.user?.id);

  useEffect(() => {
    dispatch(getBusiness(id));
    setIsLoaded(true);
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (userId && curr_business && isLoaded) {
      if (curr_business?.ownerId !== userId) history.push("/");
    }
    // eslint-disable-next-line
  }, [isLoaded, userId, curr_business]);

  return (
    <>
      {curr_business && <BusinessForm businessData={curr_business} />}
    </>
  );
};

export default UpdateBusiness;
