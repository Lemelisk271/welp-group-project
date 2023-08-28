/** Action Type Constants: */
const GET_ALL_BUSINESS = "business/GET_ALL_BUSINESS"

/**  Action Creators: */
const getBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESS,
  payload: businesses
})

/** Thunk Action Creators: */
export function getAllBusiness(){
  
}

//Reducer
export default function reducer(state = {allBusinesses: [], singleBusiness: null}, action) {
	switch (action.type) {
		case GET_ALL_BUSINESS:
			return { user: action.payload };
		default:
			return state;
	}
}
