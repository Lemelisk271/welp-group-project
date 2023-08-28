import { normalizeObj } from "./normalizeHelper";
const cloneDeep = require('clone-deep');
export const LOAD_BUSINESS = "businesses/LOAD_BUSINESS";

const get = (business) => ({
  type: LOAD_BUSINESS,
  business,
});

export const getBusiness = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  if (res.ok) {
    const business = await res.json();
    dispatch(get(business));
  }
};

const initialState = {};

const businessReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_BUSINESS:
      newState = cloneDeep(state);
      newState.singleBusiness = action.business;
      return newState;
    default:
      return state;
  }
};

export default businessReducer;
