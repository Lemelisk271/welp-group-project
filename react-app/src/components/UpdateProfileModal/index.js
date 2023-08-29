import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { editUser } from '../../store/session'
import { useModal } from '../../context/Modal'

const UpdateProfileModal = ({ user }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  console.log(user)
  const [first_name, setFirstName] = useState(user.first_name)
  const [last_name, setLastName] = useState(user.last_name)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    const errors = {}

    if (first_name.length <= 0) {
      errors.first_name = "Please enter your first name."
    }

    if (last_name.length <= 0) {
      errors.first_name = "Please enter your last name."
    }

    setValidationErrors(errors)
  }, [first_name, last_name])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(validationErrors).length > 0) {
      return
    }

    const userObj = {
      id: user.id,
      first_name,
      last_name
    }

    const data = await dispatch(editUser(userObj))
    if (data) {
      setValidationErrors(data)
    } else {
      closeModal()
    }
  }

  return (
    <div className='updateProfile'>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='first_name'>First Name:</label>
          <input
            id="first_name"
            type='text'
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='last_name'>Last Name:</label>
          <input
            id="last_name"
            type='text'
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default UpdateProfileModal
