import { useParams } from "react-router-dom";
import BusinessForm from "./BusinessForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBusiness } from "../../store/business";


const UpdateBusiness = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const curr_business = useSelector(state => state.business.singleBusiness)

    useEffect(() => {
        dispatch(getBusiness(id))
    }, [dispatch]);

    return (
        <>
            {curr_business && <BusinessForm businessData={curr_business} />}
        </>
    )
}

export default UpdateBusiness
