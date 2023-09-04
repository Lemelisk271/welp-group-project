import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { ReviewContext } from '../../context/ReviewContext'
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from '../DeleteReviewModal'
import './UserReviewListItem.css'

const UserReviewListItem = ({ review, page }) => {
  const history = useHistory()
  const [rating] = useState(review.stars)
  const [isLoaded, setIsLoaded] = useState(false)
  const [categories, setCategories] = useState([])
  const [newDate, setNewDate] = useState(new Date())
  const [pageButtons, setPageButtons] = useState("")
  const [useful, setUseful] = useState(review.votes.filter(vote => vote.type === "Useful").length)
  const [funny, setFunny] = useState(review.votes.filter(vote => vote.type === "Funny").length)
  const [cool, setCool] = useState(review.votes.filter(vote => vote.type === "Cool").length)
  const { currentReview, setCurrentReview } = useContext(ReviewContext);
  let business = useSelector((state) => state.business.allBusinesses[review.businessId])
  let user = useSelector((state) => state.session.user)

  useEffect(() => {
    setCategories(business?.categories.map(category => category.category).join(", "))
    setNewDate(new Date(review.date))

    if (page === "userProfile") {
      const editButton = (e) => {
        e.preventDefault()
        history.push(`/review/${review.id}`)
      }

      let buttons = (
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
      setPageButtons(buttons)
    }

    if (page === "businessDetail") {
      const voteObj = {}

      for (let vote of review.votes) {
        if (voteObj[vote.type] === undefined) {
          voteObj[vote.type] = 1
        } else {
          voteObj[vote.type] += 1
        }
      }

      const users = review.votes.map(vote => vote.userId)

      const usefulButton = async (e) => {
        e.preventDefault()

        const voteType = "Useful"
        const reviewId = review.id
        const userId = user.id

        const formData = new FormData()
        formData.append("type", voteType)
        formData.append("reviewId", reviewId)
        formData.append("userId", userId)

        const res = await fetch('/api/business/vote/new', {
          method: "POST",
          body: formData
        })
        const data = await res.json()
        if (data.errors) {
          data.errors.forEach(error => {
            alert({error})
            return
          })
        } else {
          setCurrentReview(!currentReview)
          setUseful(useful + 1)
          return
        }
      }

      const funnyButton = async (e) => {
        e.preventDefault()

        const voteType = "Funny"
        const reviewId = review.id
        const userId = user.id

        const formData = new FormData()
        formData.append("type", voteType)
        formData.append("reviewId", reviewId)
        formData.append("userId", userId)

        const res = await fetch('/api/business/vote/new', {
          method: "POST",
          body: formData
        })
        const data = await res.json()
        if (data.errors) {
          data.errors.forEach(error => {
            alert({error})
            return
          })
        } else {
          setCurrentReview(!currentReview)
          setFunny(funny + 1)
          return
        }
      }

      const coolButton = async (e) => {
        e.preventDefault()

        const voteType = "Cool"
        const reviewId = review.id
        const userId = user.id

        const formData = new FormData()
        formData.append("type", voteType)
        formData.append("reviewId", reviewId)
        formData.append("userId", userId)

        const res = await fetch('/api/business/vote/new', {
          method: "POST",
          body: formData
        })
        const data = await res.json()
        if (data.errors) {
          data.errors.forEach(error => {
            alert({error})
            return
          })
        } else {
          setCurrentReview(!currentReview)
          setCool(cool + 1)
          return
        }
      }

      let buttons = (
        <>
          <div className="businessDetail-buttons">
            <button
              className={users.includes(user.id) ? "businessDetail-disabled" : "businessDetail-enabled"}
              disabled={users.includes(user.id)}
              onClick={usefulButton}
            ><i className="fa-regular fa-lightbulb"></i> Useful {useful}</button>
            <button
              className={users.includes(user.id) ? "businessDetail-disabled" : "businessDetail-enabled"}
              disabled={users.includes(user.id)}
              onClick={funnyButton}
            ><i className="fa-regular fa-face-laugh"></i> Funny {funny}</button>
            <button
              className={users.includes(user.id) ? "businessDetail-disabled" : "businessDetail-enabled"}
              disabled={users.includes(user.id)}
              onClick={coolButton}
            ><i className="fa-regular fa-face-grin-stars"></i> Cool {cool}</button>
          </div>
        </>
      )
      setPageButtons(buttons)
    }

    setIsLoaded(true)
    // eslint-disable-next-line
  }, [business, review])

  return (
    <>
      {isLoaded ? (
        <div className='reviewListItem'>
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
            {pageButtons}
          </div>
        </div>
      ):(
        <h1>Loading</h1>
      )}
    </>
  )
}

export default UserReviewListItem
