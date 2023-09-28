import './AboutPage.css'

const AboutPage = () => {
  const creators = [
    {
      name: "Daniel Lewis",
      gitHub: "https://github.com/akatheduelist",
      linkedIn: "https://www.linkedin.com/in/daniel-lewis-6160635b/"
    },
    {
      name: "Darian Brooks",
      gitHub: "https://github.com/darocket34",
      linkedIn: "https://www.linkedin.com/in/darian-brooks92/"
    },
    {
      name: "Masood Saaed",
      gitHub: "https://github.com/MasoodMS95",
      linkedIn: "https://www.linkedin.com/in/masoodms/"
    },
    {
      name: "Zach Smith",
      gitHub: "https://github.com/Lemelisk271",
      linkedIn: "https://www.linkedin.com/in/zwsmith27"
    }
  ]

  return (
    <div className="aboutPage">
      <h1>About Us</h1>
      <div className='aboutPage-creators'>
        {creators.map((person, i) => (
          <div className='aboutPage-personCard' key={i}>
            <h2>{person.name}</h2>
            <div className='aboutPage-personLinks'>
              <a href={person.gitHub} alt={`${person.name} GitHub`} target='_blank' rel="noreferrer"><i className="fa-brands fa-square-github"></i></a>
              <a href={person.linkedIn} alt={`${person.name} LinkedIn`} target='_blank' rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutPage
