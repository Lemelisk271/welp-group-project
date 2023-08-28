import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findCity } from '../HelperFunctions/helper'

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [city, setCity] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const singleUser = await fetch(`/api/users/${userId}`)
      const userData = await singleUser.json()
      const cityData = await findCity(userData.zip_code)
      setUser(userData)
      setIsLoaded(true)
      setCity(cityData)
      console.log(userData)
    }
    getUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='userProfile'>
      {isLoaded ? (
        <>
          <div className='userProfile-info'>
            <img src={user.profile_image} alt=""/>
            <h2>{user.first_name} {user.last_name}</h2>
            <p>{city}</p>
            <div className='userProfile-buttons'>
              <button><i className="fa-solid fa-pencil"></i>Edit Profile</button>
              <button><i className="fa-regular fa-circle-user"></i>Change Profile Picture</button>
            </div>
          </div>
          <div className='userProfile-reviews'>
            <h1>Reviews</h1>
          </div>
        </>
      ):(
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default UserProfile
