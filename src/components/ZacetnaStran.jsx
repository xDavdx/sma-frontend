import zacetnaSlika from "./placeholder.jpg";
import KontaktForma from "./kontaktForma";
import { Link, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaRegCalendarAlt, FaYoutube, FaFacebook } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import React, { useState, useEffect, useRef } from "react";
import "./koncerti.css"
import { FaLocationDot } from "react-icons/fa6";
import {cikli} from "./cikli";
import "./Novice.css";
import {Helmet} from "react-helmet";
import slika1 from "./placeholder.jpg";
import ZamenjavaSekcije from "./zamenjavaSekcije"


    const ZacetnaStran = () => {
        const [koncerti, setKoncerti] = useState([]);

        useEffect(() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`)
                .then((res) => res.json())
                .then((data) => {
                    setKoncerti(data);
                })
                .catch((error) => console.error("Napaka pri pridobivanju koncertov:", error));
        }, []);

        const danes = new Date().toISOString().split("T")[0];

        const razvrsceniKoncerti = koncerti
            .filter((koncert) => koncert.datum > danes)
            .sort((a, b) => new Date(a.datum) - new Date(b.datum))
            .slice(0, 4);

        function formatirajDatum(datum) {
            const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
            const date = new Date(datum);

            const ure = date.getHours().toString().padStart(2, "0"); // Poskrbi, da je vedno dvomestno (npr. 09 namesto 9)
            const minute = date.getMinutes().toString().padStart(2, "0"); // Enako za minute

            return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${ure}:${minute}`;
        }

        function prikaziKrajseBesedilo(besedilo, steviloBesed = 10) {
            const besede = besedilo.split(" ");
            if (besede.length <= steviloBesed) return besedilo;
            return besede.slice(0, steviloBesed).join(" ") + "...";
        }


        const [novice, setNovice] = useState([]);

        useEffect(() => {
            const fetchNovice = async () => {
                try {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice`);
                    const data = await res.json();
                    setNovice(data); // najnovejša prva
                } catch (err) {
                    console.error("Napaka pri pridobivanju novic:", err);
                }
            };

            fetchNovice();
        }, []);

        const featured = novice[0];
        const nextThree = novice.slice(1, 4);
        const remaining = novice.slice(4);

        const renderSlika = (novica) => {
            if (!novica.slike || novica.slike.length === 0) return null;
            return (
                <img
                    src={novica.slike[0]}
                    alt="Novica"
                    className="novica-slika"
                />
            );
        };

        function Home() {
            const location = useLocation();

            useEffect(() => {
                if (location.hash === '#kontakt') {
                    const element = document.getElementById('kontakt');
                    if (element) {
                        element.scrollIntoView({behavior: 'smooth'});
                    }
                }
            }, [location]);
        }





    return (
        <div className="zacetna-stran">
            <Helmet>
                <title>Slovenski mladi abonma</title>
                <meta name="description" content="Slovenski mladi abonma organiziramo mladi glasbeniki, študenti glasbenih akademij po celi Evropi." />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="zacetna-stran">
                <div className="prva">
                    <div className="prva-levo">
                        <h1>Slovenski Mladi Abonma</h1>
                        <h2 className="podnaslov">Koncertni cikel mladih glasbenikov</h2>

                        <Link to={`/o-nas`}>
                            <button className="koncert-gumb vec-o-nas">Več o nas <IoIosArrowForward className="puscica" /></button>
                        </Link>
                    </div>

                    <div className="prva-desno">
                        <img src={zacetnaSlika} alt="SMA-skupina" />
                    </div>
                </div>
            </div>





            <div className="prihajajoci-koncerti prih-ozadje">
                <div className="sdfsdf">
                    <div className="prih-koncerti-naslov">
                        <h1>Prihajajoči koncerti</h1>
                    </div>
                    <div className="koncert-karta">
                        {razvrsceniKoncerti.map((koncert) => (
                            <div key={koncert._id} className="karta karta-zac-stran">
                                <div className="center karta-slika">
                                    <img src={koncert.slike?.[0] || "/fallback.jpg"} alt={koncert.ime} />
                                    <div className="tekst-nad-sliko">
                                        {cikli[koncert.cikel] && (
                                            <Link to={"/o-nas"}><img
                                                src={cikli[koncert.cikel].logo}
                                                alt={cikli[koncert.cikel].ime}
                                                style={{ maxWidth: "70px" }}
                                            /></Link>
                                        )}
                                    </div>
                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#8fabba" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }}/>
                                        {formatirajDatum(koncert.datum)}
                                    </h3>
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#8fabba" }}>
                                        <FaLocationDot style={{ marginRight: "10px" }}/>
                                        {koncert.lokacija}
                                    </h3>
                                    <h1 style={{ color: "#09283d" }}>{koncert.ime}</h1>
                                    <h5 style={{ color: "#8fabba" }}>{koncert.podnaslov}</h5>
                                    <Link to={`/koncerti/${koncert._id}`}>
                                        <button className="koncert-gumb" style={{ color: "white", backgroundColor: "#09283d" }}>Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                    </Link>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>







            <section className="featured-section featured-section-zac">
                <h1 className="center naslov-novice-zac">Novice</h1>
                <div className="center">
                <div className="featured-grid">
                    {featured && (
                        <div className="featured-main featured-main-zac">
                            {renderSlika(featured)}
                            <h2>{featured.ime}</h2>
                            <p>{prikaziKrajseBesedilo(featured.podnaslov)}</p>
                            {/*<span>{new Date(featured.datum).toLocaleString()}</span>*/}
                            <Link to={`/novice/${featured._id}`} className="preberi-vec">Preberi več</Link>
                        </div>
                    )}

                    <div className="featured-side">
                        {nextThree.map((novica, index) => (
                            <div key={index} className="side-novica side-novica-zac">
                                {renderSlika(novica)}
                                <div className="side-novica-content">
                                    <h3>{novica.ime}</h3>
                                    <p>{novica.podnaslov}</p>
                                    {/*<span>{new Date(novica.datum).toLocaleString()}</span>*/}
                                    <Link to={`/novice/${novica._id}`} className="preberi-vec">Preberi več</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>


            <section>
                <ZamenjavaSekcije />
            </section>




            {/*<section className="namest-zamenjalne-sekcije">*/}
            {/*    <div>*/}
            {/*        <img src={zacetnaSlika} alt=""/>*/}
            {/*    </div>*/}
            {/*    <div></div>*/}
            {/*</section>*/}


                <section className="kontakt center" id="kontakt">
                    <div className="kontakt-levo kld">
                        <div>
                            <h1>Kontaktirajte nas</h1>
                            <h3>
                                <a href="tel:+38631726060">
                                    <FaPhoneAlt /> +386 31 726 060
                                </a>
                            </h3>
                            <h3>
                                <a href="mailto:mladi.abonma@gmail.com">
                                    <MdOutlineMailOutline /> mladi.abonma@gmail.com
                                </a>
                            </h3>


                            <h1>Sledite nam:</h1>
                            <div className="social-icons">
                                <a href="https://www.youtube.com/@glasbamladih" target="_blank"><FaYoutube /></a>
                                <a href="https://www.instagram.com/sm.abonma/" target="_blank"><RiInstagramFill /></a>
                                <a href="https://www.facebook.com/sm.abonma/"><FaFacebook /></a>
                            </div>
                        </div>
                    </div>



                <div className="kontakt-desno center kld">
                    <KontaktForma />

                </div>
            </section>










        </div>
    );
};

export default ZacetnaStran;
