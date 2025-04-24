import { Link } from "react-router-dom";
import { useState } from "react";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import PostaniAbonent from "./postaniAbonent";
import logo from "../logo-sma.png";




const Navbar = () => {
    const [showAbonentForm, setShowAbonentForm] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                            <Link to="/novice" onClick={() => setMenuOpen(false)}>Novice</Link>
                        </li>
                        <li className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                            <div className="dropdown-toggle" onClick={() => {
                                if (window.innerWidth <= 800) {
                                    setDropdownOpen(!dropdownOpen);
                                }
                            }}>
                                <Link
                                    to="/o-nas"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        if (window.innerWidth > 800) setDropdownOpen(false);
                                    }}
                                    className="dropdown-link"
                                >
                                    O nas
                                </Link>
                                <IoIosArrowDown className={`dropdown-icon ${dropdownOpen ? "rotated" : ""}`} />
                            </div>

                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/drustvo-odeon" onClick={() => {
                                        setMenuOpen(false);
                                        setDropdownOpen(false);
                                    }}>Društvo Odeon</Link>
                                </li>
                                <li>
                                    <Link to="/glasba-mladih" onClick={() => {
                                        setMenuOpen(false);
                                        setDropdownOpen(false);
                                    }}>Glasba mladih</Link>
                                </li>
                            </ul>
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
                        <a href="https://www.youtube.com/@glasbamladih" target="_blank"><FaYoutube /></a>
                        <a href="https://www.instagram.com/sm.abonma/" target="_blank"><RiInstagramFill /></a>
                        <a href="https://www.facebook.com/sm.abonma/" target="_blank"><FaFacebook /></a>
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
