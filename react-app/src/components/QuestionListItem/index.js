import AnswerModal from '../AnswerModal'
import OpenModalButton from '../OpenModalButton'

const QuestionListItem = ({ question, user }) => {
  return (
    <>
    <div className="businessDetails-questionItem">
      <p>Q: {question.question}</p>
      <OpenModalButton
        buttonText={"Answer Question"}
        modalComponent={<AnswerModal question={question} user={user}/>}
      />
    </div>
    <div className="businessDetails-answerItem">
      <ul>
        {question.answers.map(answer => (
          <li key={answer.id}>A: {answer.answer}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default QuestionListItem
