import zacetnaSlika from "./placeholder.jpg";
import KontaktForma from "./kontaktForma";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaRegCalendarAlt, FaYoutube, FaFacebook } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import "./koncerti.css"





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
            .slice(0, 3);

        function formatirajDatum(datum) {
            const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
            const date = new Date(datum);

            const ure = date.getHours().toString().padStart(2, "0"); // Poskrbi, da je vedno dvomestno (npr. 09 namesto 9)
            const minute = date.getMinutes().toString().padStart(2, "0"); // Enako za minute

            return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${ure}:${minute}`;
        }





    return (
        <div className="zacetna-stran">
            <div className="zacetna-stran">
                <div className="prva">
                    <div className="prva-levo">
                        <h1>Slovenski Mladi Abonma</h1>
                        <h2>
                            Slovenski mladi abonma organiziramo mladi glasbeniki, študenti glasbenih akademij po celi Evropi.
                        </h2>
                        <h2>Abonma je razdeljen na 4 cikle: </h2>
                        <div className="zamaknjeno-besedilo">
                            <h2>- Slovenska mlada <em><b>Klasika</b></em></h2>
                            <h2>- Slovenska mlada <em><b>Kreativa</b></em></h2>
                            <h2>- Slovenski mladi abonma <em><b>Gostuje</b></em></h2>
                            <h2>- Glasba mladih <em><b>IV</b></em></h2>
                        </div>
                        <Link to={`/o-nas`}>
                            <button className="koncert-gumb">Več o nas <IoIosArrowForward className="puscica" /></button>
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

                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#8fabba" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }}/>
                                        {formatirajDatum(koncert.datum)}
                                    </h3>
                                    <h1 style={{ color: "#09283d" }}>{koncert.ime}</h1>
                                    <h5 style={{ color: "#8fabba" }}>{koncert.vsebina}</h5>
                                    <Link to={`/koncerti/${koncert._id}`}>
                                        <button className="koncert-gumb" style={{ color: "white", backgroundColor: "#09283d" }}>Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                    </Link>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


                <div className="kontakt center">
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
                                <a href=""><FaYoutube /></a>
                                <a href=""><RiInstagramFill /></a>
                                <a href=""><FaFacebook /></a>
                            </div>
                        </div>
                    </div>



                <div className="kontakt-desno center kld">
                    <KontaktForma />

                </div>
            </div>




        </div>
    );
};

export default ZacetnaStran;
