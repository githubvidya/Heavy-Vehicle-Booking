import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <div className="logo-box">
            <h3>🚛 Vehicle</h3>
          </div>
          <p>
            Fast & reliable heavy vehicle booking platform for trucks, trailers,
            and transport services.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="press" className="navLink">Press</Link></li>
            <li><Link to="careers" className="navLink">Careers</Link></li>
            <li><Link to="safety" className="navLink">Safety</Link></li>
            <li><Link to="about" className="navLink">About Us</Link></li>
            <li><Link to="contact" className="navLink">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>📍 India</p>
          <p>📞 +91 9554263457</p>
          <p>📧 support@heavyload.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© HeavyLoad. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;