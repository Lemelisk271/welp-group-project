import { useState, useEffect, useContext } from 'react'
import { ReviewContext } from "../../context/ReviewContext";
import { useModal } from '../../context/Modal'
import './BusinessImageModal.css'

const BusinessImageModal = ({ businessId, userId, owner }) => {
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(false)
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { currentReview, setCurrentReview } = useContext(ReviewContext);
  const { closeModal } = useModal()
  console.log(owner)

  useEffect(() => {
    const newErrors = []
    if (!image) {
      newErrors.push("Please select an image")
    }
    setErrors(newErrors)
  }, [image])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (errors.length) {
      return
    }

    const formData = new FormData()
    formData.append("image", image)
    formData.append("preview", preview)
    formData.append("businessId", businessId)
    formData.append("userId", userId)

    const res = await fetch('/api/business/image/new', {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    if (data.errors) {
      setErrors(data.errors)
      return
    } else {
      setCurrentReview(!currentReview)
      closeModal()
    }
  }

  const handlePreviewChange = () => {
    setPreview(!preview)
  }

  return (
    <div className='addBusinessImage'>
      <h3>Please Select an Image to add.</h3>
      {isSubmitted && <ul>
          {errors.map((error, i) => (
            <li key={i} className='addBusinessImage-error'>{ error }</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          id='image'
          type="file"
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {owner && <div className='addBusinessImage-preview'>
          <input
            type="checkbox"
            checked={preview}
            onChange={handlePreviewChange}
            className='addBusinessImage-checkbox'
          />
          <label htmlFor='preview'>Set image as preview</label>
        </div>}
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BusinessImageModal
