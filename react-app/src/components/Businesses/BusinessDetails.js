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
  }, [business, user])

  return (
    <div className='businessDetails'>
      <div className='businessDetails-images'></div>
    </div>
  )
}

export default BusinessDetails
