import BusinessImageCard from '../BusinessImageCard'
import './PictureModal.css'

const PictureModal = ({ images, owner, user }) => {
  return (
    <div className='businessImages'>
      {images.map(image => (
        <BusinessImageCard key={image.id} image={image} owner={owner} user={user} imageCount={images.length}/>
      ))}
    </div>
  )
}

export default PictureModal
