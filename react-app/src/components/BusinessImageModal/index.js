import { useState, useEffect } from 'react'
import { useModal } from '../../context/Modal'
import './BusinessImageModal.css'

const BusinessImageModal = ({ businessId, userId }) => {
  const { closeModal } = useModal()
  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const errors = []
    if (!image) {
      errors.push("Please select an image")
    }
    setValidationErrors(errors)
  }, [image])

  const handleSubmit = async (e) => {
    e.preventdefault()

    setIsSubmitted(true)
    if(validationErrors.length) {
      return
    }

    const formData = new FormData()
    formData.append("image", image)
    formData.append("businessId", businessId)
    formData.append("userId", userId)
    formData.append("preview", preview)

    console.log(formData)
  }

  const checkChange = (e) => {
    setPreview(!preview)
  }

  return (
    <div className="addBusinessImage">
      {isSubmitted && <ul>
          {validationErrors.map((error, i) => (
            <li className='addBusinessImage-errors' key={i}>{ error }</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className='addBusinessImage-checkbox'>
          <label htmlFor='image'>Set as Preview?</label>
          <input
            type="checkbox"
            value={preview}
            onChange={checkChange}
          />
          </div>
        </div>
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  )
}

export default BusinessImageModal
