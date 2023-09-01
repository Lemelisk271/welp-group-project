import React, { useRef, useState, useContext } from 'react'
import ReactDom from 'react-dom'
import './PictureModal.css'

const PictureModalContext = React.createContext()

export function PictureModalProvider({ children }) {
  const modalRef = useRef()
  const [modalContent, setModalContent] = useState(null)
  const [onModalClose, setOnModalClose] = useState(null)

  const closeModal = () => {
    setModalContent(null)
    if (typeof onModalClose === 'function') {
      setOnModalClose(null)
      onModalClose()
    }
  }

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  }

  return (
    <>
      <PictureModalContext.Provider value={contextValue}>
        {children}
      </PictureModalContext.Provider>
      <div ref={modalRef} />
    </>
  )
}

export function PictureModal () {
  const { modalRef, modalContent, closeModal } = useContext(PictureModalContext)
  if (!modalRef || !modalRef.current || !modalContent) return null
  return ReactDom.createPortal(
    <div id="pictureModal">
      <div id="pictureModal-background" on onClick={closeModal} />
      <div id="pictureModal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  )
}

export const usePictureModal = () => useContext(PictureModalContext)
