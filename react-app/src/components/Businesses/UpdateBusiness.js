import { useParams, useHistory } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBusiness, deleteBusiness } from "../../store/business";
import OpenModalButton from "../OpenModalButton";
import DeleteBusinessModal from "./DeleteBusinessModal";

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
  }, [dispatch]);

  useEffect(() => {
    if (userId && curr_business && isLoaded) {
      if (curr_business?.ownerId !== userId) history.push("/");
    }
  }, [isLoaded, userId, curr_business]);

  return (
    <>
      {curr_business && <BusinessForm businessData={curr_business} />}
      {curr_business && (
        <div className="business-form delete button">
          <OpenModalButton
            className="business-form delete button"
            buttonText="Delete"
            modalComponent={<DeleteBusinessModal className="business-form delete button" business={curr_business} />}
          />
        </div>
      )}
    </>
  );
};

export default UpdateBusiness;
