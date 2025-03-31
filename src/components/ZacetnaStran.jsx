import zacetnaSlika from "./zacetna-slika.png";
import KontaktForma from "./kontaktForma";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaRegCalendarAlt, FaYoutube, FaFacebook } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import PostaniAbonent from "./postaniAbonent";





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
            return `${date.getDate()}. ${meseci[date.getMonth()]}`;
        }




    return (
        <div className="zacetna-stran">
            <div className="prva">
                <div className="center logo-besedilo">
                    <h1>Slovenski Mladi Abonma</h1>
                </div>
                <div className="center">
                    <div className="prva-desno">
                        <img src={zacetnaSlika} alt="SMA-skupina" />
                        <h2>
                            Cikel Slovenski mladi abonma je namenjen promociji mladih glasbenikov in
                            skladateljev, ki v Sloveniji iščejo pot do profesionalne kariere. V
                            Radovljici želimo ustvariti novo središče za mlado kulturno dogajanje – prostor,
                            kjer lahko mladi umetniki ustvarjajo lastne projekte.
                        </h2>
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
                            <div key={koncert._id} className="karta">
                                <div className="center karta-slika">
                                    <img src={koncert.slika} alt={koncert.ime} />
                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#B9D9EA" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }}/>
                                        {formatirajDatum(koncert.datum)}
                                    </h3>
                                    <h1>{koncert.ime}</h1>
                                    <h5 style={{ color: "#B9D9EA" }}>{koncert.vsebina}</h5>
                                    <Link to={`/koncerti/${koncert._id}`}>
                                        <button className="koncert-gumb">Več o koncertu <IoIosArrowForward className="puscica" /></button>
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

            <div>
                <PostaniAbonent />
            </div>



        </div>
    );
};

export default ZacetnaStran;
