import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Koncerti = () => {
    const [koncerti, setKoncerti] = useState([]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`) // API klic na backend za pridobivanje koncertov
            .then((res) => res.json())
            .then((data) => {
                setKoncerti(data); // Shranimo pridobljene koncerte v stanje
            })
            .catch((error) => console.error("Napaka pri pridobivanju koncertov:", error)); // Napaka pri pridobivanju
    }, []);


    // Filtriraj in sortiraj prihodnje koncerte
    const danes = new Date().toISOString().split("T")[0]; // Dobimo današnji datum v formatu "YYYY-MM-DD"

    const razvrsceniKoncerti = koncerti
        .filter((koncert) => koncert.datum > danes) // Filtriramo prihodnje koncerte
        .sort((a, b) => new Date(a.datum) - new Date(b.datum)) // Sortiramo od najbližjega do najbolj oddaljenega
        .slice(0, 3); // Prikazujemo samo prve 3 prihajajoče koncerte

    // Funkcija za razvrščanje koncertov po letih
    const razvrstiPoLetih = (koncerti) => {
        return koncerti.reduce((letoKoncerti, koncert) => {
            const leto = new Date(koncert.datum).getFullYear(); // Pridobi leto iz datuma
            if (!letoKoncerti[leto]) {
                letoKoncerti[leto] = []; // Če leto še ne obstaja, ga dodaj
            }
            letoKoncerti[leto].push(koncert); // Dodaj koncert v ustrezno leto
            return letoKoncerti;
        }, {});
    };

    // Razvrstimo vse koncerte po letih
    const koncertiPoLetih = razvrstiPoLetih(koncerti);

    function formatirajDatum(datum) {
        const meseci = [
            "januar", "februar", "marec", "april", "maj", "junij",
            "julij", "avgust", "september", "oktober", "november", "december"
        ];

        const date = new Date(datum);
        const dan = date.getDate();
        const mesec = date.getMonth();

        return `${dan}. ${meseci[mesec]}`;
    }

    return (
        <div className="koncerti">
            {/* Prihajajoči koncerti */}
            <div className="prihajajoci-koncerti ozadje-prih-koncerti">
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

            {/* Ostali koncerti - Arhiv koncertov */}
            <div className="arhiv-koncertov-container">
                <Link to={"/koncerti/dodajadminmodule"}>Dodaj koncerte</Link>
                <h2 className="arhiv-koncertov-naslov">Arhiv koncertov</h2>
                {Object.keys(koncertiPoLetih).sort((a, b) => b - a).map((leto) => ( // Razvrstimo leta od najnovejšega
                    <div key={leto} className="arhiv-leto-koncerti">
                        <h3 className="arhiv-leto-naslov">{leto}</h3>
                        <div className="arhiv-koncerti-karta-container">
                            {koncertiPoLetih[leto].map((koncert) => (
                                <div key={koncert._id} className="arhiv-koncert-karta">
                                    <div className="arhiv-karta-slika">
                                        <img src={koncert.slika} alt={koncert.ime} />
                                    </div>
                                    <div className="arhiv-karta-tekst">
                                        <p><FaRegCalendarAlt />{formatirajDatum(koncert.datum)}</p>
                                        <h3>{koncert.ime}</h3>
                                        <p>{koncert.vsebina}</p>
                                        <Link to={`/koncerti/${koncert._id}`}>
                                            <button className="koncert-gumb">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Koncerti;
