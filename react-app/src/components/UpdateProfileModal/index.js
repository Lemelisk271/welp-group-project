import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { editUser } from '../../store/session'
import { useModal } from '../../context/Modal'
import { lookup } from 'zipcodes'
import './UpdateProfileModal.css'

const UpdateProfileModal = ({ user }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [first_name, setFirstName] = useState(user.first_name)
  const [last_name, setLastName] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [zip_code, setZipCode] = useState(user.zip_code)
  const [birthday, setBirthDay] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const userBirthday = new Date(user.birthday)
    let month = userBirthday.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = userBirthday.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let year = userBirthday.getFullYear()
    const date = `${year}-${month}-${day}`
    setBirthDay(date)
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const errors = {}

    if (first_name.length <= 0) {
      errors.first_name = "Please enter your first name."
    }

    if (last_name.length <= 0) {
      errors.first_name = "Please enter your last name."
    }

    if (!emailReg.test(email)) {
      errors.email = "Please enter a valid Email address."
    }

    const zip = lookup(zip_code)
    if (zip === undefined) {
      errors.zip_code = "Please enter a valid zip"
    }

    setValidationErrors(errors)
    // eslint-disable-next-line
  }, [first_name, last_name, zip_code, email])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) {
      return
    }

    const userObj = {
      id: user.id,
      first_name,
      last_name,
      email,
      zip_code,
      birthday
    }

    const data = await dispatch(editUser(userObj))
    if (data) {
      setErrors(data.errors)
    } else {
      closeModal()
    }
  }

  return (
    <div className='updateProfile'>
      <h2>Update {user.first_name}'s Profile</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, i) => (
            <li className='profileForm-errors' key={i}>{ error }</li>
          ))}
        </ul>
        <div>
          <label htmlFor='first_name'>First Name:</label>
          <input
            id="first_name"
            type='text'
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />
          <p className='profileForm-errors'>{isSubmitted && validationErrors.first_name && `* ${validationErrors.first_name}`}</p>
        </div>
        <div>
          <label htmlFor='last_name'>Last Name:</label>
          <input
            id="last_name"
            type='text'
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />
          <p className='profileForm-errors'>{isSubmitted && validationErrors.last_name && `* ${validationErrors.last_name}`}</p>
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id="email"
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p className='profileForm-errors'>{isSubmitted && validationErrors.email && `* ${validationErrors.email}`}</p>
        </div>
        <div>
          <label htmlFor='zip_code'>Zip Code:</label>
          <input
            id="zip_code"
            type='number'
            value={zip_code}
            onChange={e => setZipCode(e.target.value)}
          />
          <p className='profileForm-errors'>{isSubmitted && validationErrors.zip_code && `* ${validationErrors.zip_code}`}</p>
        </div>
        <div>
          <label htmlFor='birthday'>Birthday:</label>
          <input
            id="birthday"
            type='date'
            value={birthday}
            onChange={e => setBirthDay(e.target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default UpdateProfileModal
