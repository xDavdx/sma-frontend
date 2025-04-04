import { Link } from "react-router-dom";
import {FaYoutube, FaFacebook, FaPhoneAlt} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from "./sma-logo-font.png";
import React from "react";
import {MdOutlineMailOutline} from "react-icons/md";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Levi del: Logo */}
                <div className="footer-logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                {/* Sredina: Povezave */}
                <div className="footer-links">
                    <ul>
                        <li><Link to="/koncerti">Koncerti</Link></li>
                        <li><Link to="/o-nas">O nas</Link></li>
                        <li><Link to="/drustvo-odeon">Društvo Odeon</Link></li>
                    </ul>
                </div>

                {/* Desni del: Kontaktni podatki in Socialne ikone */}
                <div className="footer-contact">
                    <div className="contact-info">
                        <h1>Kontaktirajte nas</h1>
                        <p><a href="tel:+38631726060">
                            <FaPhoneAlt /> +386 31 726 060
                        </a></p>
                        <p><a href="mailto:mladi.abonma@gmail.com">
                            <MdOutlineMailOutline /> mladi.abonma@gmail.com
                        </a></p>
                    </div>
                    <div className="social-icons-footer">
                        <h1>Sledite nam:</h1>
                        <a href="#" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <RiInstagramFill />
                        </a>
                        <a href="#" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>
            <div className="center footer-spodaj">
                <hr className="footer-hr"/>
                <p>&copy; 2025 - Slovenski mladi abonma. Vse pravice pridržane</p>
            </div>
        </footer>
    );
};

export default Footer;
