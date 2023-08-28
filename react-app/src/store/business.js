import { normalizeObj } from "./normalizeHelper";
const cloneDeep = require('clone-deep');
/** Action Type Constants: */
const GET_ALL_BUSINESS = "business/GET_ALL_BUSINESS"
const LOAD_BUSINESS = "businesses/LOAD_BUSINESS";

/**  Action Creators: */
const getBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESS,
  payload: businesses
})

const get = (business) => ({
  type: LOAD_BUSINESS,
  business,
});

/** Thunk Action Creators: */
export function getAllBusiness(){

}

export const getBusiness = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  if (res.ok) {
    const business = await res.json();
    dispatch(get(business));
  }
};

const businessReducer = (state = {allBusinesses: [], singleBusiness: null}) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case GET_ALL_BUSINESS:
      newState.allBusinesses = [];
      newState.allBusinesses = action.payload;
      return newState;
    case LOAD_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    default:
      return state;
  }
};

export default businessReducer;
