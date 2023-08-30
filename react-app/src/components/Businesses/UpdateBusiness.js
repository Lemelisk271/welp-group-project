import { useParams, useHistory } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBusiness, deleteBusiness } from "../../store/business";

const UpdateBusiness = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const curr_business = useSelector((state) => state.business.singleBusiness);
  const userId = useSelector((state) => state.session.user.id);

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

  const deleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(deleteBusiness(id));
      if (res) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {curr_business && <BusinessForm businessData={curr_business} />}
      {curr_business && <button onClick={deleteSubmit}>DELETE</button>}
    </>
  );
};

export default UpdateBusiness;
