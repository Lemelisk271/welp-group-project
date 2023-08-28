import { useState } from "react"

const UserReviewListItem = ({ review }) => {
  const [rating] = useState(review.stars)

  let newDate = new Date(review.date)

  return (
    <div className="reviewListItem">
      <div className="reviewListItem-business">
        <img src="https://picsum.photos/100/100.jpg" alt="Business" />
        <div className="reviewListItem-businessInfo">
          <p>Business Name</p>
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
    </div>
  )
}

export default UserReviewListItem
