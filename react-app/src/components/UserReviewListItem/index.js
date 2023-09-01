import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from '../DeleteReviewModal'

const UserReviewListItem = ({ review, page }) => {
  const [rating] = useState(review.stars)
  const history = useHistory()
  let business = useSelector((state) => state.business.allBusinesses[review.businessId])

  let newDate = new Date(review.date)

  let categories = business?.categories.map(category => category.category).join(", ")

  const editButton = (e) => {
    e.preventDefault()
    history.push(`/review/${review.id}`)
  }

  let buttons

  if (page === "userProfile") {
    buttons = (
      <>
        <button onClick={editButton}>Edit Review</button>
        <OpenModalButton
          buttonText="Delete Review"
          modalComponent={<DeleteReviewModal id={review.id}/>}
        />
      </>
    )
  }

  if (page === "businessDetail") {
    buttons = (
      <>
      </>
    )
  }

  return (
    <div className="reviewListItem">
      <div className="reviewListItem-business">
        <img src={business?.preview_image.url} alt={business?.name} />
        <div className="reviewListItem-businessInfo">
          <h3>{business?.name}</h3>
          <p>{ categories }</p>
          <p>{business?.city}, {business?.state}</p>
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
      <div className="reviewListItem-buttons">
        {buttons}
      </div>
    </div>
  )
}

export default UserReviewListItem
