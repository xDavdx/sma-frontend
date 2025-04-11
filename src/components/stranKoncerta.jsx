import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


function StranKoncerta() {
    const { id } = useParams();
    const [koncert, setKoncert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Koncert ni najden");
                }
                return res.json();
            })
            .then((data) => {
                setKoncert(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Napaka pri pridobivanju koncerta:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2 style={{ marginTop: "8em" }}>Nalaganje...</h2>;
    if (error) return <h2>{error}</h2>;

    const images = koncert.slike.map((slika) => ({
        original: slika,
        thumbnail: slika,
    }));

    function formatirajDatum(datum) {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);
        const ure = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${ure}:${minute}`;
    }

    const izvajalciData = typeof koncert.izvajalci === "string"
        ? JSON.parse(koncert.izvajalci)
        : koncert.izvajalci;


    const toRoman = (num) => {
        const romanMap = [
            ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
            ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
            ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
        ];

        return romanMap.reduce((acc, [letter, value]) => {
            while (num >= value) {
                acc += letter;
                num -= value;
            }
            return acc;
        }, "");
    };





    return (
        <div>
            <section className="koncert-stran center">
                <div className="koncert-levo">
                    <Link to="/koncerti" className="gumb-nazaj-na-koncerte">
                        <button className="gumb-nazaj-na-koncerte">Nazaj na koncerte</button>
                    </Link>
                    <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                        <FaRegCalendarAlt style={{ marginRight: "10px", fontWeight: "300" }} />
                        {formatirajDatum(koncert.datum)}
                    </h3>
                    <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                        <FaLocationDot style={{ marginRight: "10px", fontWeight: "300" }} />
                        {koncert.lokacija}
                    </h3>
                    <h1>{koncert.ime}</h1>
                    <p>{koncert.podnaslov}</p>
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={4000}
                        showFullscreenButton={false}
                    />

                </div>
                <div className="koncert-desno">
                    <h1>Izvajalci:</h1>


                    {izvajalciData.map((skupina, index) => (
                        <div key={index}>
                            {skupina.imeSkupine && <h3>{skupina.imeSkupine}</h3>}
                            {skupina.izvajalci.map((izvajalec, idx) => (
                                <p key={idx}>
                                    <b>{izvajalec.ime}</b> - {izvajalec.instrument}
                                </p>
                            ))}
                        </div>
                    ))}


                </div>
            </section>



            <section className="center koncert-program">
                <div className="stran-koncerta-program-wrapper">
                    <div className="stran-koncerta-program-h1">
                        <h1>Program</h1>
                        <hr/>
                    </div>

                    <div className="array-program">
                        {koncert.program.map((item, index) => (
                            <div key={index}>
                                <h3>{item.skladatelj}: {item.naslov}</h3>
                                {Array.isArray(item.stavki) && item.stavki.map((stavek, idx) => (
                                    <p key={idx}>
                                        <b>{toRoman(idx + 1)}.</b> {stavek}
                                    </p>
                                ))}

                            </div>
                        ))}
                    </div>

                </div>
            </section>




            <section className="koncert-stran-vsebina">
                <h1>O koncertu</h1>
                <p>{koncert.vsebina}</p>
            </section>




            <section className="rezervacija-vstopnic center">
                <div className="rezervacija-vstopnic-levo">
                    <h1>Rezervacija vstopnic</h1>
                    <form className="rezervacija-vstopnic-form">
                        <input
                            type="text"
                            placeholder="Ime in priimek"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Št. vstopnic"
                            className="input-st-kart"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </form>
                </div>
                <div className="rezervacija-vstopnic-desno center">
                    <h1>Podrobnosti koncerta</h1>
                    <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                        <FaRegCalendarAlt style={{ marginRight: "10px", fontWeight: "300" }} />
                        {formatirajDatum(koncert.datum)}
                    </h3>
                    <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                        <FaLocationDot style={{ marginRight: "10px", fontWeight: "300" }} />
                        {koncert.lokacija}
                    </h3>
                </div>
            </section>

        </div>
    );
}

export default StranKoncerta;
