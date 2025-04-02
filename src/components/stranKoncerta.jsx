import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import koledar from "./calendar.png";
import React from "react";
import {FaRegCalendarAlt} from "react-icons/fa";

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
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);

        const ure = date.getHours().toString().padStart(2, "0"); // Poskrbi, da je vedno dvomestno (npr. 09 namesto 9)
        const minute = date.getMinutes().toString().padStart(2, "0"); // Enako za minute

        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${ure}:${minute}`;
    }

    return (
        <div className="koncert-stran">
            <div className="koncert-levo">
                <Link to="/koncerti">
                    <button>Nazaj na koncerte</button>
                </Link>
                <h3 style={{ display: "flex", alignItems: "center", color: "black" }}>
                    <FaRegCalendarAlt style={{ marginRight: "10px" }}/>
                    {formatirajDatum(koncert.datum)}
                </h3>
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
