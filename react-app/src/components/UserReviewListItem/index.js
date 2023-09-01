import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from '../DeleteReviewModal'

const UserReviewListItem = ({ review, page }) => {
  const [rating] = useState(review.stars)
  const [votes, setVotes] = useState({})
  const history = useHistory()
  let business = useSelector((state) => state.business.allBusinesses[review.businessId])

  useEffect(() => {
    if (page === 'businessDetail') {
      const voteObj = {}
      for (let vote of review.votes) {
        if (voteObj[vote.type] === undefined) {
          voteObj[vote.type] = 1
        } else {
          voteObj[vote.type] += 1
        }
      }
      setVotes(voteObj)
    }
  }, [])

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
        <div className="reviewListItem-buttons">
          <button onClick={editButton}>Edit Review</button>
          <OpenModalButton
            buttonText="Delete Review"
            modalComponent={<DeleteReviewModal id={review.id}/>}
          />
        </div>
      </>
    )
  }

  if (page === "businessDetail") {
    buttons = (
      <>
        <div className="businessDetail-buttons">
          <button><i className="fa-regular fa-lightbulb"></i> Useful {votes.Useful}</button>
          <button><i className="fa-regular fa-face-laugh"></i> Funny {votes.Funny}</button>
          <button><i className="fa-regular fa-face-grin-stars"></i> Cool {votes.Cool}</button>
        </div>
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
      <div>
        {buttons}
      </div>
    </div>
  )
}

export default UserReviewListItem
