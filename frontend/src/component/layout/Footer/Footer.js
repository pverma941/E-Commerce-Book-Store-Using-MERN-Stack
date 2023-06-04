import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer() {
  return (
    <footer className='footer'>
      <div className='upperfooter'>
        <h1>BooksBug Store</h1>
        <p>High Quality is our first Priority</p>
        <div >
        <div className="aboutSectionContainer2">
            <Link
              to="https://github.com/pverma941"
              target="blank"
            >
              <GitHubIcon className="GitubSvgIcon" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/verma-munna-works/"
              target="blank"
            >
              <LinkedInIcon className="LinkedInSvgIcon" />
            </Link>

            <Link to="https://www.instagram.com/m.v._here_/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </Link>
          </div>
      </div>
        <p>Copirights 2023 &copy; BooksBug</p>
      </div>
    
    </footer>
  )
}
