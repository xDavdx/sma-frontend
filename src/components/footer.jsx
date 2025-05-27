import { Link } from "react-router-dom";
import {FaYoutube, FaFacebook, FaPhoneAlt} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from "./sma-logo-font.png";
import React from "react";
import {MdOutlineMailOutline} from "react-icons/md";
import Sponzor1 from "./MinistrstvoZaKulturo.png";
import Sponzor2 from "./RADOLCA.png"
import Sponzor3 from "./radovljica.png"
import Sponzor4 from "./Zavarovalnica-Triglav_LOGO-Vertical_Negativ-02.png"
import { IoIosArrowDown } from "react-icons/io";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Levi del: Logo */}
                <div className="footer-logo center">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                {/* Sredina: Povezave */}
                <div className="footer-links center">
                    <div>
                        {/*<div className="linki-margin">*/}
                        {/*    <ul>*/}
                        {/*        <li><Link to="/koncerti">Koncerti</Link>*/}
                        {/*            <ul className="footer-linki-ul">*/}
                        {/*               <li><Link to="/koncerti">sfsd</Link></li>*/}
                        {/*            </ul>*/}
                        {/*        </li>*/}
                        {/*        <li><Link to="/novice">Novice</Link></li>*/}
                        {/*        <li><Link to="/o-nas">O nas<IoIosArrowDown /></Link>*/}
                        {/*            <ul className="footer-linki-ul">*/}
                        {/*                <li><Link to="/drustvo-odeon">Društvo Odeon</Link></li>*/}
                        {/*                <li><Link to="/glasba-mladih">Glasba mladih</Link></li>*/}
                        {/*            </ul>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <div>
                            <h2>Abonma podpirajo</h2>
                            <div className="center margin-alala">
                                <Link to="https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-kulturo/" target="_blank"><img src={Sponzor1} alt="" style={{ width: "12em" }} /></Link>
                                <Link to="https://www.radolca.si/?gad_source=1&gbraid=0AAAAADL-WxNGblb0hfXq96xH8ej7HnkGC&gclid=Cj0KCQjw_dbABhC5ARIsAAh2Z-SjXcZzz8MD2rijCpF6Ylh38wGxif4GudSAJIxrjqLfU4YdMXPq9uwaAlV3EALw_wcB" target="_blank"><img src={Sponzor2} alt="" style={{ width: "7em" }}/></Link>
                                <Link to="https://www.radovljica.si/" target="_blank"><img src={Sponzor3} alt="" style={{ width: "3em" }}/></Link>
                                <Link to="https://www.radovljica.si/" target="_blank"><img src={Sponzor4} alt="" style={{ width: "10em" }}/></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desni del: Kontaktni podatki in Socialne ikone */}
                <div className="footer-contact center">
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
                        <a href="https://www.youtube.com/@glasbamladih" target="_blank" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="https://www.instagram.com/sm.abonma/" target="_blank"  aria-label="Instagram">
                            <RiInstagramFill />
                        </a>
                        <a href="https://www.facebook.com/sm.abonma/" target="_blank" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>


            <div className="center footer-spodaj">
                <hr className="footer-hr"/>

                <p>
                    © 2025 - Slovenski mladi abonma. Vse pravice pridržane |{" "}
                    <a href="/pravilnik-zasebnosti" className="zasebnost-footer">
                        Pravilnik o zasebnosti
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
