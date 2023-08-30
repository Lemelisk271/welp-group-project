import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeImage } from '../../store/session'
import { useModal } from '../../context/Modal'
import './UserPictureModal.css'

const UserPictureModal = ({ user }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)
    if (validationErrors.length) {
      return
    }

    const formData = new FormData()
    formData.append("image", image)
    formData.append("id", user.id)

    console.log(formData)

    const data = await dispatch(changeImage(user.id, formData))
    if (data) {
      setValidationErrors(data)
    } else {
      closeModal()
    }
  }

  useEffect(() => {
    const errors = []
    if (!image) {
      errors.push("Please select an image")
    }
    setValidationErrors(errors)
  }, [image])

  return (
    <div className="userPictureModal">
      <img src={user.profile_image} alt={user.first_name} />
      {isSubmitted && <ul>
          {validationErrors.map((error, i) => (
            <li className='profileForm-errors' key={i}>{ error }</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor='image'>Image:</label>
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

export default UserPictureModal
