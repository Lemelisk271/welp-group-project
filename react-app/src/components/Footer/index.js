import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="footer-container">
      <ul>
        <li>
          <Link to='/about'>About Us</Link>
        </li>
        <li>
          <p>&copy; {year} All rights reserved.</p>
        </li>
      </ul>
    </div>
  )
}

export default Footer
