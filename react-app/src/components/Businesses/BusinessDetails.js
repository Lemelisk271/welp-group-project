import { useState, useEffect } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBusiness } from '../../store/business'

const BusinessDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [previewImage, setPreviewImage] = useState([])
  const [averageStars, setAverageStars] = useState(0)
  const [businessCategories, setBusinessCategories] = useState([])
  const business = useSelector(state => state.business.singleBusiness)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getBusiness(id))
      .then(() => setIsLoaded(true))
      .catch(() => history.push("/notfound"))
  }, [dispatch])

  useEffect(() => {
    if (user?.id === business?.ownerId) {
      setIsOwner(true)
    }
    setPreviewImage(business?.images.filter(image => image.preview === true))
    let totalStars = 0
    business?.reviews.forEach(el => {
      totalStars += el.stars
    })
    if (business?.reviews.length !== 0) {
      setAverageStars(Math.floor((totalStars / business.reviews.length) * 10) / 10)
    }
    setBusinessCategories(business.categories.map(business => business.category))
  }, [business, user])

  let sessionLinks

  if (user) {
    sessionLinks = (
      <div className='businessDetails-sessionButtons'>
        <button>Write a Review</button>
        <button>Add Photo</button>
      </div>
    )
  }

  let ownerLinks

  if (isOwner) {
    ownerLinks = (
      <div className='businessDetails-ownerButtons'>
        <button>Edit {business.name}</button>
        <button>Delete {business.name}</button>
      </div>
    )
  }

  return (
    <div className='businessDetails'>
      {isLoaded ? (
        <>
          <div className='businessDetails-header'>
            <img src={previewImage[0].url} alt={business.name}/>
            <div className='businessDetails-header-info'>
              <h2>{business.name}</h2>
              <div className='businessDetails-header-reviews'>
                <div
                  className={averageStars >= 1 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={averageStars >= 2 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={averageStars >= 3 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={averageStars >= 4 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <div
                  className={averageStars >= 5 ? "filled" : "empty"}
                >
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>{averageStars} ({business.reviews.length} reviews)</p>
              </div>
              <div className='businessDetails-header-info'>
                <ul>
                  {businessCategories.map((category, i) => (
                    <li key={i}>{category}</li>
                  ))}
                </ul>
                <div className='businessDetails-header-price'>
                  <div className={business.price >= 1 ? "businessDetails-price" : "businessDetails-price-hidden"}>
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div className={business.price >= 2 ? "businessDetails-price" : "businessDetails-price-hidden"}>
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div className={business.price >= 3 ? "businessDetails-price" : "businessDetails-price-hidden"}>
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                  <div className={business.price >= 4 ? "businessDetails-price" : "businessDetails-price-hidden"}>
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                </div>
              </div>
              <div className='businessDetails-header-hours'>
                <h3>Hours:</h3>
                <ul>
                  {business?.hours.map(el => (
                    <li key={el.id}>
                      {el.day} - {el.open_time && new Date("August 19, 1975" + " " + el.open_time).toLocaleTimeString() + " -" || "Closed"} {el.close_time && new Date("August 19, 1975" + " " + el.close_time).toLocaleTimeString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='businessDetails-page'>
            <div className='businessDetails-content'>
              <div className='businessDetails-contentButtons'>
                {user && sessionLinks}
                {isOwner && ownerLinks}
              </div>
              <div className='businessDetails-amenities'>
                <h2>Amenities and More</h2>
                <ul>
                  {business?.amenities.map(amenity => (
                    <li key={amenity.id}>
                      <img src={amenity.icon_url} alt={amenity.amenity}/>
                      <p>{amenity.amenity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='businessDetails-info'></div>
          </div>
        </>
      ):(
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BusinessDetails
