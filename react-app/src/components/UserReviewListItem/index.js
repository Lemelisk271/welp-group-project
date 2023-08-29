import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const UserReviewListItem = ({ review }) => {
  const [rating] = useState(review.stars)
  const [isLoaded, setIsLoaded] = useState(false)
  let business = useSelector((state) => state.business.allBusinesses[review.businessId])

  let newDate = new Date(review.date)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="reviewListItem">
      {isLoaded ? (
        <>
          <div className="reviewListItem-business">
            <img src={business.preview_image.url} alt={business.name} />
            <div className="reviewListItem-businessInfo">
              <p>{business.name}</p>
              <p>Business Categories</p>
            </div>
          </div>
          <div className="reviewListItem-stars">
            <div
              className={rating >= 1 ? "filled" : "empty"}
            >
              <i className="fa-solid fa-star"></i>
            </div>
            <div
              className={rating >= 2 ? "filled" : "empty"}
            >
              <i className="fa-solid fa-star"></i>
            </div>
            <div
              className={rating >= 3 ? "filled" : "empty"}
            >
              <i className="fa-solid fa-star"></i>
            </div>
            <div
              className={rating >= 4 ? "filled" : "empty"}
            >
              <i className="fa-solid fa-star"></i>
            </div>
            <div
              className={rating >= 5 ? "filled" : "empty"}
            >
              <i className="fa-solid fa-star"></i>
            </div>
            <p>{newDate.toLocaleDateString(undefined, {month: "short", day: "2-digit", year: "numeric"})}</p>
          </div>
          <div className="reviewListItem-review">
            <p>{review.review}</p>
          </div>
        </>
      ):(
        <h1>Loading</h1>
      )}
    </div>
  )
}

export default UserReviewListItem
