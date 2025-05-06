import React from "react";
import {FaFacebook, FaFacebookF, FaInstagram, FaPhoneAlt, FaYoutube} from "react-icons/fa";
import { oNasPodatki } from "./oNasPodatki";
import logo from "./sma-logo-font.png";
import onasSlika from "./placeholder.jpg";
import KontaktForma from "./kontaktForma";
import {MdOutlineMailOutline} from "react-icons/md";
import {RiInstagramFill} from "react-icons/ri";
import {Helmet} from "react-helmet";
import LogoKlasika from "./smklasik.png"
import LogoGlasbaM from "./smglasbamladih.png"
import LogoKreativa from "./smkreativ.png"
import LogoGostuje from "./smagost.png"
import {Link} from "react-router-dom";
import { cikliPodatki } from "./oNasCikliPodatki"

const ONas = () => {
    return (
        <div className="onas-container">
            <Helmet>
                <title>SMA - O nas</title>
                <meta name="description" content="S svojim trudom si želimo pomagati mladim slovenskim umetnikom, ki iščejo pot do profesionalne kariere" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Sekcija: O nas */}
            <section className="onas-uvod">
                <div className="onas-uvod-container">
                    <div className="onas-uvod-left"></div>

                    <div className="onas-uvod-center">
                        <img src={logo} alt="logo" style={{ width: "25em" }} />
                    </div>

                    <div className="onas-uvod-right">
                        <a href="/drustvo-odeon">Društvo Odeon</a>
                        <a href="/glasba-mladih">Glasba mladih</a>
                    </div>
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




            <section className="razlozeni-cikli">
                <h1 className="arhiv-koncertov-naslov">
                    Abonma sestavljajo štirje koncertni cikli, ki se razlikujejo po vsebini in izvajalcih:
                </h1>

                <div className="razlozeni-cikli-wrapper">
                    {cikliPodatki.map((cikel, index) => (
                        <Link className="flex-onas-cikli" to={`/o-nas/${cikel.slug}`} style={{ color: "black" }} key={cikel.slug}>
                            <div className="razlozeni-cikli-kartica">
                                <img src={cikel.logo} alt={cikel.ime} />
                                <h1>{cikel.ime}</h1>
                                <p>{cikel.opis}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </section>





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
        </div>
    );
};

export default ONas;
