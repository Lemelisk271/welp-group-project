

const QuestionListItem = ({ question }) => {
  return (
    <>
    <div className="businessDetails-questionItem">
      <p>Q: {question.question}</p>
      <button>Answer Question</button>
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
