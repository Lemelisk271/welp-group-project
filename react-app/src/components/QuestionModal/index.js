import { useState, useEffect, useContext } from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import { useModal } from '../../context/Modal'
import './QuestionModal.css'

const QuestionModal = ({ business, user }) => {
  const [question, setQuestion] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { currentReview, setCurrentReview } = useContext(ReviewContext);
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = []

    if(question.length === 0) {
      errors.push("Please enter a question")
    }

    setValidationErrors(errors)
  }, [question])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (validationErrors.length > 0) {
      return
    }

    const businessId = business.id
    const userId = user.id

    const formData = new FormData()
    formData.append("question", question)
    formData.append("businessId", businessId)
    formData.append("userId", userId)

    const res = await fetch('/api/business/question/new', {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    if (data.errors) {
      setValidationErrors(data.errors)
      return
    } else {
      setCurrentReview(!currentReview)
      closeModal()
    }
  }

  return (
    <div className="questionModal">
      <h3>Ask {business.name} a question</h3>
      {isSubmitted && <ul>
          {validationErrors.map((error, i) => (
            <li key={i} className='questionModal-errors'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleFormSubmit}>
        <div className='questionModal-question'>
          <label htmlFor='question'>What is your question?</label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default QuestionModal
