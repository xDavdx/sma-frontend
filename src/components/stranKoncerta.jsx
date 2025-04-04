import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaRegCalendarAlt } from "react-icons/fa";

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

    if (loading) return <h2>Nalaganje...</h2>;
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

    return (
        <div>
            <section className="koncert-stran">
                <div className="koncert-levo">
                    <Link to="/koncerti">
                        <button>Nazaj na koncerte</button>
                    </Link>
                    <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                        <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                        {formatirajDatum(koncert.datum)}
                    </h3>
                    <h1>{koncert.ime}</h1>
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={4000}
                        showFullscreenButton={false}
                    />

                </div>
                <div className="koncert-desno">
                    <h1>O izvajalcih</h1>
                    <p>{koncert.vsebina}</p>
                </div>
            </section>
        </div>
    );
}

export default StranKoncerta;
