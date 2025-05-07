import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import "./koncerti.css";
import {cikli} from "./cikli";
import {Helmet} from "react-helmet";
import { sezone } from "./sezonaLetnice"

const Koncerti = () => {






    const [koncerti, setKoncerti] = useState([]);
    const [steviloVidnihPrihodnjih, setSteviloVidnihPrihodnjih] = useState(4);
    const [vidniPoLetih, setVidniPoLetih] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`)
            .then((res) => res.json())
            .then((data) => setKoncerti(data))
            .catch((error) => console.error("Napaka pri pridobivanju koncertov:", error));
    }, []);

    const danes = new Date().toISOString().split("T")[0];

    const prihodnjiKoncerti = koncerti
        .filter((koncert) => koncert.datum > danes)
        .sort((a, b) => new Date(a.datum) - new Date(b.datum));

    const pretekliKoncerti = koncerti
        .filter((koncert) => koncert.datum <= danes)
        .sort((a, b) => new Date(b.datum) - new Date(a.datum));

    const razvrstiPoLetih = (koncerti) => {
        return koncerti.reduce((letoKoncerti, koncert) => {
            const leto = new Date(koncert.datum).getFullYear();
            if (!letoKoncerti[leto]) letoKoncerti[leto] = [];
            letoKoncerti[leto].push(koncert);
            return letoKoncerti;
        }, {});
    };



    const koncertiPoLetih = razvrstiPoLetih(pretekliKoncerti);

    function formatirajDatum(datum) {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }

    function prikaziKrajseBesedilo(besedilo, steviloBesed = 10) {
        const besede = besedilo.split(" ");
        if (besede.length <= steviloBesed) return besedilo;
        return besede.slice(0, steviloBesed).join(" ") + "...";
    }


    return (
        <section className="koncerti">
            <Helmet>
                <title>SMA - Koncerti</title>
                <meta name="description" content="Koncerti Slovenskega mladega abonmaja" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Prihajajoči koncerti TOP sekcija */}
            <div className="prihajajoci-koncerti ozadje-prih-koncerti">
                <div className="sdfsdf">
                    <div className="prih-koncerti-naslov prih-koncerti-naslov-bel">
                        <h1>Prihajajoči koncerti</h1>
                    </div>
                    <div className="koncert-karta">
                        {prihodnjiKoncerti.slice(0, 4).map((koncert) => (
                            <div key={koncert._id} className="karta">
                                <div className="center karta-slika">
                                    <img src={koncert.slike?.[0] || "/fallback.jpg"} alt={koncert.ime} />
                                    <div className="tekst-nad-sliko">
                                        {cikli[koncert.cikel] && (
                                            <Link to={"/o-nas"}> <img
                                                src={cikli[koncert.cikel].logo}
                                                alt={cikli[koncert.cikel].ime}
                                                style={{ maxWidth: "70px" }}
                                            /></Link>
                                        )}
                                    </div>
                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#B9D9EA" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                        {formatirajDatum(koncert.datum)}
                                    </h3>
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#B9D9EA" }}>
                                        <FaLocationDot style={{ marginRight: "10px" }} />
                                        {koncert.lokacija}
                                    </h3>
                                    <h1>{koncert.ime}</h1>
                                    <h5 style={{ color: "#B9D9EA" }}>{koncert.podnaslov}</h5>
                                    <Link to={`/koncerti/${koncert._id}`}>
                                        <button className="koncert-gumb">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <Link to={"/admin-dodajaj"}><h1 className="koncert-gumb dodaj-koncerte-gumb">+ Dodaj koncert</h1></Link>


            <section className="arhiv-koncertov-container">
                <h2 className="arhiv-koncertov-naslov">Arhiv koncertov</h2>

                <div className="sezone-container">
                    {sezone.sort((a, b) => b.leto - a.leto).map((sezona) => (
                        <div key={sezona.leto} className="sezona-kartica">
                            <img src={sezona.slika} alt={sezona.ime} className="sezona-slika" />
                            <h1>{sezona.ime}</h1>
                            <p>Število koncertov: <i><b>{koncerti.filter(k => new Date(k.datum).getFullYear() === sezona.leto).length}</b></i></p>
                            <Link className="center" to={`/sezona/${sezona.leto}`}>
                                <button className="koncert-gumb sezona-gumb-lala">Pregled sezone</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Koncerti;
