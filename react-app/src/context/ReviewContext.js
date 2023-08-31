import { createContext, useState } from 'react'

export const ReviewContext = createContext()

export const ReviewProvider = props => {
  const [currentReview, setCurrentReview] = useState(false)

  return (
    <ReviewContext.Provider value={{currentReview, setCurrentReview}}>
      {props.children}
    </ReviewContext.Provider>
  )
}

export default ReviewProvider
