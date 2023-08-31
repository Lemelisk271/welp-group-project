import { useContext, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchContext } from '../../context/SearchContext'
import { getAllBusiness } from '../../store/business'
import BusinessSearchListItem from '../BusinessSearchListItem'

const BusinessSearchPage = () => {
  const dispatch = useDispatch()
  const { currentSearch } = useContext(SearchContext)
  const [rawBusinesses, setRawBusinesses] = useState({})
  const [searchList, setSearchList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const businessList = useSelector(state => state.business.allBusinesses)

  useEffect(() => {
    dispatch(getAllBusiness())
  }, [dispatch])


  useEffect(() => {
    const regex = new RegExp(`${currentSearch}.*`, 'i')
    if (businessList) {
      setRawBusinesses(businessList)
      const values = Object.values(rawBusinesses)
      setSearchList(values.filter(business => regex.exec(business.name) || regex.exec(business.about) || regex.exec(business.categories.map(business => business.category).join())))
      setIsLoaded(true)
    }
    // eslint-disable-next-line
  }, [currentSearch, businessList])

  return (
    <div className="business-search">
      {isLoaded ? (
        <>
          <h1>Business Search Page</h1>
          <div className="business-search-content">
            <div className="business-search-filters">
              <p>Filters</p>
            </div>
            <div className="business-search-items">
              {searchList?.map(business => (
                <BusinessSearchListItem key={business.id} business={business}/>
              ))}
            </div>
          </div>
        </>
      ):(
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BusinessSearchPage
