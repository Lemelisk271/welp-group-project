import { useState, useEffect, useContext } from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import { useModal } from '../../context/Modal'
import './AnswerModal.css'

const AnswerModal = ({ question, user }) => {
  const [answer, setAnswer] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { currentReview, setCurrentReview } = useContext(ReviewContext);
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = []

    if (answer.length === 0) {
      errors.push("Please answer the question.")
    }

    setValidationErrors(errors)
  }, [answer])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (validationErrors.length > 0) {
      return
    }

    const questionId = question.id
    const userId = user.id

    const formData = new FormData()
    formData.append("answer", answer)
    formData.append("questionId", questionId)
    formData.append("userId", userId)

    const res = await fetch('/api/business/answer/new', {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    if (data.errors) {
      setValidationErrors(data.errors)
    } else {
      setCurrentReview(!currentReview)
      closeModal()
    }
  }

  return (
    <div className="answerModal">
      <h3>Question: {question.question}</h3>
      {isSubmitted && <ul>
          {validationErrors.map((error, i) => (
            <li key={i} className='answerModal-errors'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleFormSubmit}>
        <div className="answerModal-answer">
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AnswerModal
