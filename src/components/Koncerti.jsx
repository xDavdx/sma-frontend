import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./koncerti.css"

const Koncerti = () => {
    const [koncerti, setKoncerti] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`)
            .then((res) => res.json())
            .then((data) => setKoncerti(data))
            .catch((error) => console.error("Napaka pri pridobivanju koncertov:", error));
    }, []);

    const danes = new Date().toISOString().split("T")[0];

    // Filtriranje prihodnjih in preteklih koncertov
    const prihodnjiKoncerti = koncerti
        .filter((koncert) => koncert.datum > danes)
        .sort((a, b) => new Date(a.datum) - new Date(b.datum));

    const pretekliKoncerti = koncerti
        .filter((koncert) => koncert.datum <= danes)
        .sort((a, b) => new Date(b.datum) - new Date(a.datum)); // Razvrščanje od najbližjega preteklega

    // Razvrstitev preteklih koncertov po letih in znotraj let
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

    return (
        <section className="koncerti">
            {/* Prihajajoči koncerti */}
            <div className="prihajajoci-koncerti ozadje-prih-koncerti">
                <div className="sdfsdf">
                    <div className="prih-koncerti-naslov prih-koncerti-naslov-bel">
                        <h1>Prihajajoči koncerti</h1>
                    </div>
                    <div className="koncert-karta">
                        {prihodnjiKoncerti.slice(0, 3).map((koncert) => (
                            <div key={koncert._id} className="karta">
                                <div className="center karta-slika">
                                    <img src={koncert.slika} alt={koncert.ime} />
                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#B9D9EA" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }} />
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

            <section className="vsi-prihajajoci-koncerti">
                {/* Sekcija vseh prihodnjih koncertov v arhivu */}
                {prihodnjiKoncerti.length > 0 && (
                    <div className="arhiv-leto-koncerti">
                        <h3 className="arhiv-leto-naslov">Vsi prihajajoči koncerti</h3>
                        <div className="arhiv-koncerti-karta-container">
                            {prihodnjiKoncerti.map((koncert) => (
                                <div key={koncert._id} className="arhiv-koncert-karta">
                                    <div className="arhiv-karta-slika">
                                        <img src={koncert.slika} alt={koncert.ime} />
                                    </div>
                                    <div className="arhiv-karta-tekst">
                                        <p style={{ display: "flex", alignItems: "center", color: "black" }}>
                                            <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                            {formatirajDatum(koncert.datum)}
                                        </p>
                                        <h3>{koncert.ime}</h3>
                                        <p>{koncert.vsebina}</p>
                                        <Link to={`/koncerti/${koncert._id}`}>
                                            <button className="koncert-gumb arhiv-gumb-barva">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Arhiv koncertov */}
            <section className="arhiv-koncertov-container">
                <Link to={"/koncerti/dodajadminmodule"}>Dodaj koncerte</Link>
                <h2 className="arhiv-koncertov-naslov">Arhiv koncertov</h2>

                {/* Razvrščeni pretekli koncerti po letih */}
                {Object.keys(koncertiPoLetih).sort((a, b) => b - a).map((leto) => (
                    <div key={leto} className="arhiv-leto-koncerti">
                        <h3 className="arhiv-leto-naslov">{leto}</h3>
                        <div className="arhiv-koncerti-karta-container">
                            {koncertiPoLetih[leto]
                                .sort((a, b) => new Date(b.datum) - new Date(a.datum)) // Znotraj leta sortiramo od najbližjega preteklega
                                .map((koncert) => (
                                    <div key={koncert._id} className="arhiv-koncert-karta">
                                        <div className="arhiv-karta-slika">
                                            <img src={koncert.slika} alt={koncert.ime} />
                                        </div>
                                        <div className="arhiv-karta-tekst">
                                            <p style={{ display: "flex", alignItems: "center", color: "black" }}>
                                                <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                                {formatirajDatum(koncert.datum)}
                                            </p>
                                            <h3>{koncert.ime}</h3>
                                            <p>{koncert.vsebina}</p>
                                            <Link to={`/koncerti/${koncert._id}`}>
                                                <button className="koncert-gumb arhiv-gumb-barva">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default Koncerti;
