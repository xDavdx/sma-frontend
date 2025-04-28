import React from "react";
import {FaFacebook, FaFacebookF, FaInstagram, FaPhoneAlt, FaYoutube} from "react-icons/fa";
import { oNasPodatki } from "./oNasPodatki";
import logo from "./sma-logo-font.png";
import onasSlika from "./placeholder.jpg";
import KontaktForma from "./kontaktForma";
import {MdOutlineMailOutline} from "react-icons/md";
import {RiInstagramFill} from "react-icons/ri";
import {Helmet} from "react-helmet";

const ONas = () => {
    return (
        <div className="onas-container">
            <Helmet>
                <title>SMA - O nas</title>
                <meta name="description" content="S svojim trudom si želimo pomagati mladim slovenskim umetnikom, ki iščejo pot do profesionalne kariere" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Sekcija: O nas */}
            <section className="onas-uvod center">
                <div className="onas-uvod-header-levo">
                    <img src={logo} alt="logo" style={{ width: "25em" }}/>
                </div>
            </section>

            {/* Uvodni opis */}
            <div className="center">
                <section className="odeon-content">
                    <h1>O nas</h1>
                    <p>
                        Slovenski mladi abonma organiziramo mladi slovenski glasbeniki.
                    </p>

                    <div className="onas-uvod-header-desno">
                        <img src={onasSlika} alt="Kulturno društvo Odeon"/>
                        <div className="onas-uvod-header-desno-div">
                            <h2>Kaj počnemo?</h2>
                            <p>
                                Koncertni cikel Slovenski mladi abonma organiziramo mladi glasbeniki, ki svoje znanje o glasbi izpopolnjujemo na univerzah po celi Evropi. S svojim trudom želimo pomagati mladim slovenskim umetnikom, ki iščejo pot do profesionalne kariere, jim dati oder in omogočati njihov umetniški razvoj. Abonma je prostor, kjer lahko mladi ustvarjamo po svoje in skupaj raziskujemo nova glasbena obzorja. Vedno iščemo nove načine za ustvarjanje priložnosti in bogatiti slovensko kulturno dogajanje.

                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sekcija: Spoznajte nas */}
            <section className="onas-ekipa">
                <h2>Spoznajte nas</h2>
                <div className="onas-ekipa-grid">
                    {oNasPodatki.map((oseba, index) => (
                        <div key={index} className="ekipa-card">
                            <img src={oseba.slika} alt={oseba.ime} className="ekipa-slika" />
                            <h3>{oseba.ime}</h3>
                            <p>{oseba.opis}</p>
                            <div className="ekipa-social">
                                <a href={oseba.facebook} target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href={oseba.instagram} target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Sekcija "Kaj počnemo?" */}
            <section className="odeon-activities onas-act">
                <div className="odeon-columns">
                    {/* Leva kolona */}
                    <div className="odeon-column">
                        <h3>Postani del ekipe!</h3>
                        <p>
                            Vedno iščemo mlade, ki si želijo tudi izkušenj v organizacijskih vodah! Če vas zanima, nam pišite ali nas kontaktirajte preko družabnih omrežij!
                        </p>
                    </div>

                    {/* Desna kolona */}
                    <div className="odeon-column">
                        <h3>Kontakt:</h3>

                                            <a href="tel:+38631726060">
                                                <p><FaPhoneAlt /> +386 31 726 060</p>
                                            </a>

                                            <a href="mailto:mladi.abonma@gmail.com">
                                                <p><MdOutlineMailOutline /> mladi.abonma@gmail.com</p>
                                            </a>

                                        <div className="social-icons">
                                            <a href=""><p><FaYoutube /></p></a>
                                            <a href=""><RiInstagramFill /></a>
                                            <a href=""><FaFacebook /></a>
                                        </div>
                    </div>
                </div>
            </section>


            {/*/!* Sekcija: Postani del ekipe *!/*/}
            {/*<section className="onas-pridruzi">*/}
            {/*    <div className="kontakt center">*/}
            {/*        <div className="kontakt-levo kld">*/}
            {/*            <div>*/}
            {/*                <h1>Postani del ekipe!</h1>*/}
            {/*                <h3>*/}
            {/*                    <a href="tel:+38631726060">*/}
            {/*                        Vedno iščemo mlade, ki si želijo tudi izkušenj v organizacijskih vodah! Če vas zanima, nam pišite ali nas kontaktirajte preko družabnih omrežij!*/}
            {/*                    </a>*/}
            {/*                </h3>*/}
            {/*                <h1>Kontakt:</h1>*/}
            {/*                <h3>*/}
            {/*                    <a href="tel:+38631726060">*/}
            {/*                        <FaPhoneAlt /> +386 31 726 060*/}
            {/*                    </a>*/}
            {/*                </h3>*/}
            {/*                <h3>*/}
            {/*                    <a href="mailto:mladi.abonma@gmail.com">*/}
            {/*                        <MdOutlineMailOutline /> mladi.abonma@gmail.com*/}
            {/*                    </a>*/}
            {/*                </h3>*/}
            {/*                <div className="social-icons">*/}
            {/*                    <a href=""><FaYoutube /></a>*/}
            {/*                    <a href=""><RiInstagramFill /></a>*/}
            {/*                    <a href=""><FaFacebook /></a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}



            {/*        <div className="kontakt-desno center kld">*/}
            {/*            <KontaktForma />*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
};

export default ONas;
