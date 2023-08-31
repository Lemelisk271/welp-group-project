import './DeleteReviewModal.css'
import { useModal } from '../../context/Modal'
import { useState, useContext } from 'react'
import { ReviewContext } from '../../context/ReviewContext'

const DeleteReviewModal = ({ id }) => {
  const { closeModal } = useModal()
  const { currentReview, setCurrentReview } = useContext(ReviewContext)
  const [errors, setErrors] = useState([])

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    const deleteReview = await fetch(`/api/review/${id}`, {
      method: "DELETE"
    })
    const data = await deleteReview.json()
    if (data.errors) {
      setErrors(data.errors)
    } else {
      setCurrentReview(!currentReview)
      closeModal()
    }
  }

  return (
    <div className='deleteReviewModal'>
      <ul>
        {errors.map((error, i) => (
          <li className='deleteReviewModal-errors' key={i}>{error}</li>
        ))}
      </ul>
      <h1>Are you sure you want to delete this review?</h1>
      <h2>This change will be permanent.</h2>
      <div className='deleteReviewModal-buttons'>
        <button onClick={deleteButton} className='deleteReviewModal-deleteButton'>Delete</button>
        <button onClick={cancelButton} className='deleteReviewModal-cancelButton'>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteReviewModal
