import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import koledar from "./calendar.png";
import React from "react";

function StranKoncerta() {
    const { id } = useParams(); // Dobi ID iz URL-ja
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

    function formatirajDatum(datum) {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij",
            "julij", "avgust", "september", "oktober", "november", "december"];

        const date = new Date(datum);
        return `${date.getDate()}. ${meseci[date.getMonth()]}`;
    }

    return (
        <div className="koncert-stran">
            <div className="koncert-levo">
                <Link to="/koncerti">
                    <button>Nazaj na koncerte</button>
                </Link>
                <p style={{ display: "flex", alignItems: "center" }}>
                    <img src={koledar} alt="koledar" style={{ width: "5%", marginRight: "10px" }} />
                    {formatirajDatum(koncert.datum)}
                </p>
                <h1>{koncert.ime}</h1>
                <img src={koncert.slika} alt={koncert.ime} />
            </div>
            <div className="koncert-desno">
                <h1>O izvajalcih</h1>
                <p>{koncert.vsebina}</p>
            </div>
        </div>
    );
}


// {koncert.slike.map((slika, index) => (
//     <img key={index} src={slika} alt={`Koncert ${koncert.ime}`} />
// ))}

export default StranKoncerta;
