import BusinessImageCard from '../BusinessImageCard'
import './PictureModal.css'

const PictureModal = ({ images, owner, user }) => {
  console.log("images", images)
  return (
    <div className='businessImages'>
      {images.map(image => (
        <BusinessImageCard key={image.id} image={image} owner={owner} />
      ))}
    </div>
  )
}

export default PictureModal
