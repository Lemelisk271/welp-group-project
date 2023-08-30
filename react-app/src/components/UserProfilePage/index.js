import { useParams, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCity } from '../HelperFunctions/helper'
import { getAllBusiness } from '../../store/business'
import UserReviewListItem from '../UserReviewListItem'
import OpenModalButton from '../OpenModalButton'
import UpdateProfileModal from "../UpdateProfileModal"
import UserPictureModal from '../UserPictureModal'
import './UserProfilePage.css'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [city, setCity] = useState('')
  const [reviews, setReviews] = useState([])
  const [rawReviews, setRawReviews] = useState([])
  const [search, setSearch] = useState('')
  const selectUser = useSelector(state => state.session.user)

  useEffect(() => {
    const getUser = async () => {
      dispatch(getAllBusiness())
      const singleUser = await fetch(`/api/users/${userId}`)
      const userData = await singleUser.json()
      const cityData = await findCity(userData.zip_code)
      userData.reviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date)
      })
      setUser(userData)
      setIsLoaded(true)
      setCity(cityData)
      setReviews(userData.reviews)
      setRawReviews(userData.reviews)
    }
    getUser()
    // eslint-disable-next-line
  }, [selectUser])

  useEffect(() => {
    const regex = new RegExp(`${search}.*`, 'i')
    if (search === "" || search === null) {
      setReviews(rawReviews)
    } else {
      setReviews(rawReviews.filter(review => regex.exec(review.review)))
    }
  }, [search])

  if (selectUser.id != userId) {
    return <Redirect to={`/profile/${selectUser.id}`} />
  }

  return (
    <div className='userProfile'>
      {isLoaded ? (
        <>
          <div className='userProfile-info'>
            <img src={user.profile_image} alt=""/>
            <h2>{user.first_name} {user.last_name}</h2>
            <p>{city}</p>
            <p className='userProfile-userReviewsCount'><i className="fa-solid fa-star userProfile-userReviews"></i>{user['reviews'].length}</p>
            <div className='userProfile-buttons'>
              <div className='userProfile-buttonsProfile'>
                <i className="fa-solid fa-pencil"></i>
                <OpenModalButton
                  buttonText="Edit Profile"
                  modalComponent={<UpdateProfileModal user={user} />}
                />
              </div>
              <div className='userProfile-buttonsPic'>
                <i className="fa-regular fa-circle-user"></i>
                <OpenModalButton
                  buttonText="Change Picture"
                  modalComponent={<UserPictureModal user={user} />}
                />
              </div>
            </div>
          </div>
          <div className='userProfile-reviews'>
            <h1>Reviews</h1>
            <div className='userProfile-search'>
              <input
                type='text'
                placeholder='Search Reviews'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {reviews.map(review => (
              <UserReviewListItem key={review.id} review={review} />
            ))}
          </div>
        </>
      ):(
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default UserProfile
