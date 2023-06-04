import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:pverma941@rku.ac.in">
        <Button>Contact: pverma941@rku.ac.in</Button>
      </a>
    </div>
  );
};

export default Contact;