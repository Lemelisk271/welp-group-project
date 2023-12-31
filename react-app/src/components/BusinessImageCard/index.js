import { useState, useEffect, useContext } from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import { useModal } from '../../context/Modal'
import './BusinessImageCard.css'

const BusinessImageCard = ({image, owner, user, imageCount}) => {
  const [isUser, setIsUser] = useState(false)
  const [errors, setErrors] = useState([])
  const { currentReview, setCurrentReview } = useContext(ReviewContext)
  const { closeModal } = useModal()

  useEffect(() => {
    if (user && image.ownerId === user.id) {
      setIsUser(true)
    }
    // eslint-disable-next-line
  }, [])

  const deleteImage = async () => {
    const deletedImage = await fetch(`/api/business/image/${image.id}`, {
      method: "DELETE"
    })
    const data = await deletedImage.json()
    if (data.errors) {
      setErrors(data.errors)
    }
    else {
      setCurrentReview(!currentReview)
      closeModal()
    }
  }

  let deleteButton

  if ((owner || isUser) && imageCount > 1) {
    deleteButton = (
      <button onClick={deleteImage}>Delete</button>
    )
  }

  return (
    <div className="businessImageCard">
      <ul>
        {errors.map(error => (
          <li>{error}</li>
        ))}
      </ul>
      <img src={image.url} alt=""/>
      {deleteButton}
    </div>
  )
}

export default BusinessImageCard
