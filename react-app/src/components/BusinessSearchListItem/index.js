import { useEffect, useState } from 'react'

const BusinessSearchListItem = ({ business }) => {
  const [averageStars, setAverageStars] = useState(0)
  const [businessCategories, setBusinessCategories] = useState([])

  useEffect(() => {
    const reviews = business.reviews
    let totalStars = 0
    reviews.forEach(el => {
      totalStars += el.stars
    })
    if (reviews.length !== 0) {
      setAverageStars(Math.floor(totalStars / reviews.length))
    }
    let categories = business.categories.map(business => business.category)
    setBusinessCategories(categories)
  }, [])

  return (
    <div className='business-search-item'>
      <h3>{business.name}</h3>
      <div className='business-search-item-stars'>
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
        <p>Average Stars: {averageStars}</p>
      </div>
      <p>{businessCategories.join(", ")}</p>
      <div className='business-search-item-address'>
        <p>{business.address}</p>
        <p>{business.city}, {business.state} {business.zip_code}</p>
      </div>
    </div>
  )
}

export default BusinessSearchListItem
