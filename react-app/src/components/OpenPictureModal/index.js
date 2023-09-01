import { usePictureModal } from '../../context/PictureModal'

const OpenPictureModalButton = ({ modalComponent, buttonText, onButtonClick, onModalClose }) => {
  const { setModalContent, seOnModalClose } = usePictureModal()

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick ()
    if (typeof onModalClose === 'function') onModalClose()
    setModalContent(modalComponent)
  }

  return <button onClick={onClick}>{buttonText}</button>
}

export default OpenPictureModalButton
