import { useState } from 'react'
import { useModal } from '../../context/Modal'

const BusinessImageModal = ({ businessId, userId }) => {
  const { closeModal } = useModal()
  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventdefault()
  }

  return (
    <div className="addBusinessImage">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BusinessImageModal
