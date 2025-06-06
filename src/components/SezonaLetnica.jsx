import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sezone } from "./sezonaLetnice";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cikli } from "./cikli";
import logo from "./sma-logo-font.png";

const SezonaLetnica = () => {
    const { leto } = useParams();
    const [koncerti, setKoncerti] = useState([]);
    const [loading, setLoading] = useState(true); //


    function formatirajDatum(datum) {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }


    useEffect(() => {
        setLoading(true); // pri vsaki spremembi leta ponovno naloži
        fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`)
            .then((res) => res.json())
            .then((data) => {
                const pretekli = data.filter(k => new Date(k.datum).getFullYear().toString() === leto);
                setKoncerti(pretekli);
                setLoading(false); // ko so podatki pripravljeni
            })
            .catch((error) => {
                console.error("Napaka pri pridobivanju koncertov:", error);
                setLoading(false); // tudi ob napaki ustavi nalaganje
            });
    }, [leto]);

    const sezona = sezone.find(s => s.leto.toString() === leto);

    const koncertiPoCiklih = koncerti.reduce((acc, koncert) => {
        if (!acc[koncert.cikel]) acc[koncert.cikel] = [];
        acc[koncert.cikel].push(koncert);
        return acc;
    }, {});

    if (!sezona) return <div>Sezona ni najdena.</div>;

    if (loading) {
        return (
            <section className="koncerti">
                <div className="nalaganje-koncertov" style={{ textAlign: "center", padding: "50px", fontSize: "30px", marginTop: "8em" }}>
                    Nalaganje sezone...
                </div>
            </section>
        );
    }


    return (
        <section className="sezona-stran">
            <section className="onas-uvod center">
                <div className="onas-uvod-header-levo">
                    <h1>{sezona.ime}</h1>
                    {/*<p>{sezona.opis}</p>*/}
                </div>
            </section>


            <div className="gumbi-cikli">
                {Object.keys(cikli).map(cikel => (
                    koncertiPoCiklih[cikel]?.length > 0 && (
                        <a key={cikel} href={`#cikel-${cikel}`}>
                            <button className="cikel-gumb">{cikli[cikel].ime}</button>
                        </a>
                    )
                ))}
            </div>

            {Object.keys(cikli).map(cikel => (
                koncertiPoCiklih[cikel]?.length > 0 && (
                    <div key={cikel} id={`cikel-${cikel}`} className="cikel-sekcija">
                        {cikel === "glasbaMladih" && sezona.gmVsebina ? (
                            <div className="gm-sekcija">
                                <div className="gm-sekcija-besedilo">
                                    <div>
                                        <h2 className="gm-naslov">{sezona.gmNaslov}</h2>
                                    </div>
                                </div>
                            </div>
                        ) : cikel === "mlada klasika" && sezona.mkVsebina ? (
                            <div className="gm-sekcija">
                                <div className="gm-sekcija-besedilo">
                                    <div>
                                        <h2 className="gm-naslov">{sezona.mkNaslov}</h2>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h2 className="cikel-naslov">{cikli[cikel].ime}</h2>
                        )}


                        <div className="arhiv-koncerti-karta-container">
                            {koncertiPoCiklih[cikel].map(koncert => (
                                <div key={koncert._id} className="arhiv-koncert-karta">
                                    <div className="arhiv-karta-slika">
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
                                    <div className="arhiv-karta-tekst">
                                        <p style={{ display: "flex", alignItems: "center", color: "#656565" }}>
                                            <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                            {formatirajDatum(new Date(koncert.datum))}
                                        </p>
                                        <h3>{koncert.ime}</h3>
                                        <p>{koncert.podnaslov}</p>
                                        <Link to={`/koncerti/${koncert._id}`}>
                                            <button className="koncert-gumb arhiv-gumb-barva">Več o koncertu</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}

        </section>
    );
};

export default SezonaLetnica;
