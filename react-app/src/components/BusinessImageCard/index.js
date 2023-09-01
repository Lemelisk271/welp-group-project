import './BusinessImageCard.css'

const BusinessImageCard = ({image}) => {
  return (
    <div className="businessImageCard">
      <img src={image.url} alt=""/>
    </div>
  )
}

export default BusinessImageCard
