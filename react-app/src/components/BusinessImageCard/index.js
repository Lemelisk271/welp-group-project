import './BusinessImageCard.css'

const BusinessImageCard = ({image, owner}) => {
  let deleteButton

  if (owner) {
    deleteButton = (
      <button>Delete</button>
    )
  }

  return (
    <div className="businessImageCard">
      <img src={image.url} alt=""/>
      {deleteButton}
    </div>
  )
}

export default BusinessImageCard
