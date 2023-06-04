import React from "react";
import "./AboutUs.css";
import {  Typography, Avatar } from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";
const AboutUs = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/meabhisingh";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dyy7fzofe/image/upload/v1685451692/avatars/odtgccsqj3x3eoolfv8r.jpg"
              alt="Avatar"
            />
            <Typography>Munna Verma</Typography>
            
            <span>
              This is a E-Commerce Book Store wesbite made by Munna Verma.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Link
              to="https://github.com/pverma941"
              target="blank"
            >
              <GitHubIcon className="GitHubSvgIcon" />
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
      </div>
    </div>
  );
};

export default AboutUs;