import { Link } from "react-router-dom";
import { useState } from "react";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import PostaniAbonent from "./postaniAbonent";
import logo from "../logo-sma.png";

const Navbar = () => {
    const [showAbonentForm, setShowAbonentForm] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={logo} alt="Logo" />
                </Link>

                {/* Hamburger meni */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                    <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                    <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                </div>

                {/* Navigacija */}
                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <ul className="nav-links">
                        <li>
                            <Link to="/koncerti" onClick={() => setMenuOpen(false)}>Koncerti</Link>
                        </li>
                        <li>
                            <Link to="/o-nas" onClick={() => setMenuOpen(false)}>O nas</Link>
                        </li>
                        <li>
                            <Link to="/drustvo-odeon" onClick={() => setMenuOpen(false)}>Društvo Odeon</Link>
                        </li>
                        <li>
                            <button
                                className="abonent-btn"
                                onClick={() => {
                                    setShowAbonentForm(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Postani abonent
                            </button>
                        </li>
                    </ul>

                    {/* Socialne ikone */}
                    <div className="social-icons">
                        <a href="#"><FaYoutube /></a>
                        <a href="#"><RiInstagramFill /></a>
                        <a href="#"><FaFacebook /></a>
                    </div>
                </div>
            </nav>

            {/* Modal za Postani Abonent */}
            {showAbonentForm && (
                <div className="abonent-modal">
                    <div className="abonent-overlay" onClick={() => setShowAbonentForm(false)}></div>
                    <div className="abonent-content">
                        <button className="close-btn" onClick={() => setShowAbonentForm(false)}>✖</button>
                        <PostaniAbonent />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
