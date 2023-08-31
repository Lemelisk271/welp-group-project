import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BusinessSearchListItem.css'

const BusinessSearchListItem = ({ business }) => {
  const [averageStars, setAverageStars] = useState(0)
  const [image, setImage] = useState('')
  const [businessCategories, setBusinessCategories] = useState([])

  useEffect(() => {
    const reviews = business.reviews
    let totalStars = 0
    reviews.forEach(el => {
      totalStars += el.stars
    })
    if (reviews.length !== 0) {
      setAverageStars(Math.floor((totalStars / reviews.length) * 10) / 10)
    }
    let categories = business.categories.map(business => business.category)
    setBusinessCategories(categories)
    const previewImage = business.images.filter(image => image.preview === true)
    setImage(previewImage[0].url)
    // eslint-disable-next-line
  }, [])

  return (
    <Link to={`/business/${business.id}`}>
      <div className='business-search-item'>
        <img src={image} alt={business.name}/>
        <div className='business-search-item-info'>
          <h2>{business.name}</h2>
          <div className='business-search-item-stars'>
            <div className='searchItem-stars'>
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
            </div>
            <div className='searchItem-avgStars'>
              <p>Average Stars: {averageStars} ({business.reviews.length} reviews)</p>
            </div>
          </div>
          <div className='business-search-item-details'>
            <ul>
              {businessCategories.map(category => (
                <li key={category}>{ category }</li>
              ))}
            </ul>
            <div className='business-search-item-price'>
              <div className={business.price >= 1 ? "businessSearch-price" : "businessSearch-price-hidden"}>
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <div className={business.price >= 2 ? "businessSearch-price" : "businessSearch-price-hidden"}>
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <div className={business.price >= 3 ? "businessSearch-price" : "businessSearch-price-hidden"}>
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <div className={business.price >= 4 ? "businessSearch-price" : "businessSearch-price-hidden"}>
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
            </div>
            <p>{business.city}, {business.state}</p>
          </div>
          <p>{ business.about }</p>
        </div>
      </div>
    </Link>
  )
}

export default BusinessSearchListItem
