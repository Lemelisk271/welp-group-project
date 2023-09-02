import { useState, useEffect } from 'react'
// import { useModal } from '../../context/Modal'
import './BusinessImageModal.css'

const BusinessImageModal = ({ businessId, userId }) => {
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(false)
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const newErrors = []
    if (!image) {
      newErrors.push("Please select an image")
    }
    setErrors(newErrors)
  }, [image])

  const handleSubmit = (e) => {
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

    console.log(formData.values())
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
        <div className='addBusinessImage-preview'>
          <label htmlFor='preview'>Set image as preview?</label>
          <input
            type="checkbox"
            checked={preview}
            onChange={handlePreviewChange}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BusinessImageModal
