import BusinessImageCard from '../BusinessImageCard'
import './PictureModal.css'

const PictureModal = ({ images }) => {
  console.log("images", images)
  return (
    <div className='businessImages'>
      {images.map(image => (
        <BusinessImageCard key={image.id} image={image} />
      ))}
    </div>
  )
}

export default PictureModal
