import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./koncerti.css";

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

    function prikaziKrajseBesedilo(besedilo, steviloBesed = 12) {
        const besede = besedilo.split(" ");
        if (besede.length <= steviloBesed) return besedilo;
        return besede.slice(0, steviloBesed).join(" ") + "...";
    }


    return (
        <section className="koncerti">
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
                                </div>
                                <div className="karta-tekst">
                                    <h3 style={{ display: "flex", alignItems: "center", color: "#B9D9EA" }}>
                                        <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                        {formatirajDatum(koncert.datum)}
                                    </h3>
                                    <h1>{koncert.ime}</h1>
                                    <h5 style={{ color: "#B9D9EA" }}>{prikaziKrajseBesedilo(koncert.vsebina)}</h5>
                                    <Link to={`/koncerti/${koncert._id}`}>
                                        <button className="koncert-gumb">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* ARHIV koncertov */}
            <section className="arhiv-koncertov-container">
                <Link to={"/koncerti/dodajadminmodule"}>Dodaj koncerte</Link>
                <h2 className="arhiv-koncertov-naslov">Arhiv koncertov</h2>

                {Object.keys(koncertiPoLetih).sort((a, b) => b - a).map((leto) => {
                    const vidno = vidniPoLetih[leto] || 4;
                    const koncertiLeta = koncertiPoLetih[leto].sort((a, b) => new Date(b.datum) - new Date(a.datum));
                    const seVec = vidno < koncertiLeta.length;

                    return (
                        <div key={leto} className="arhiv-leto-koncerti">
                            <h3 className="arhiv-leto-naslov">{leto}</h3>
                            <div className="arhiv-koncerti-karta-container">
                                {koncertiLeta.slice(0, vidno).map((koncert) => (
                                    <div key={koncert._id} className="arhiv-koncert-karta">
                                        <div className="arhiv-karta-slika">
                                            <img src={koncert.slike?.[0] || "/fallback.jpg"} alt={koncert.ime} />
                                        </div>
                                        <div className="arhiv-karta-tekst">
                                            <p style={{ display: "flex", alignItems: "center", color: "black" }}>
                                                <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                                {formatirajDatum(koncert.datum)}
                                            </p>
                                            <h3>{koncert.ime}</h3>
                                            <p>{prikaziKrajseBesedilo(koncert.vsebina)}</p>
                                            <Link to={`/koncerti/${koncert._id}`}>
                                                <button className="koncert-gumb arhiv-gumb-barva">Več o koncertu <IoIosArrowForward className="puscica" /></button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {seVec && (
                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <button
                                        onClick={() =>
                                            setVidniPoLetih((prev) => ({
                                                ...prev,
                                                [leto]: koncertiLeta.length,
                                            }))
                                        }
                                        className="koncert-gumb-vec"
                                    >
                                        Prikaži več
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>
        </section>
    );
};

export default Koncerti;
