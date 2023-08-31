// import { normalizeObj } from "./normalizeHelper";
const cloneDeep = require("clone-deep");

/** Action Type Constants: */
const GET_ALL_BUSINESS = "business/GET_ALL_BUSINESS";
const LOAD_BUSINESS = "business/LOAD_BUSINESS";
const CREATE_BUSINESS = "business/CREATE_BUSINESS";
const UPDATE_BUSINESS = "business/UPDATE_BUSINESS";
const DELETE_BUSINESS = "business/DELETE_BUSINESS";

/**  Action Creators: */
const getBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESS,
  payload: businesses,
});

const getSingleBusiness = (business) => ({
  type: LOAD_BUSINESS,
  business,
});

const createNewBusiness = (business) => ({
  type: CREATE_BUSINESS,
  business,
});

const editBusiness = (business) => ({
  type: UPDATE_BUSINESS,
  business,
});

const removeBusiness = (business) => ({
  type: DELETE_BUSINESS,
  business,
});

/** Thunk Action Creators: */
export const getAllBusiness = () => async (dispatch) => {
  const res = await fetch("/api/business");
  if (res.ok) {
    const businesses = await res.json();
    dispatch(getBusinesses(businesses.businesses));
  } else {
    const { errors } = await res.json();
    return errors;
  }
};

export const getBusiness = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  if (res.ok) {
    const business = await res.json();
    dispatch(getSingleBusiness(business));
    return business;
  } else {
    const { errors } = await res.json();
    return errors;
  }
};

export const createBusiness = (businessData) => async (dispatch) => {
  try {
    const res = await fetch("/api/business/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(businessData),
    });
    if (res.ok) {
      const business = await res.json();
      dispatch(createNewBusiness(business));
      return business;
    } else {
      const errors = await res.json();
      console.log("ERRORS.JS", errors);
      return errors;
    }
  } catch (err) {
    console.log("BACKEND THUNKKKKKKKKKKKKKKKKK", err);
    return err;
    // if (err) {
    //   // const { errors } = await err.json();
    // }
  }
};

export const updateBusiness = (businessData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/business/${businessData.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(businessData),
    });
    if (res.ok) {
      const business = await res.json();
      dispatch(editBusiness(business));
      return business;
    }
    const errors = await res.json();
    console.log("ERRORS.JS", errors);
    return errors;
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const deleteBusiness = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/business/${id}/edit`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      dispatch(removeBusiness(id));
      return;
    }
  } catch (err) {
    const { errors } = err.json();
    return errors;
  }
};

const businessReducer = (
  state = { allBusinesses: [], singleBusiness: null },
  action
) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case GET_ALL_BUSINESS:
      newState.allBusinesses = {};
      action.payload.forEach((business) => {
        newState.allBusinesses[business.id] = business;
      });
      return newState;
    case LOAD_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case CREATE_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case UPDATE_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case DELETE_BUSINESS:
      return newState;
    default:
      return state;
  }
};

export default businessReducer;
