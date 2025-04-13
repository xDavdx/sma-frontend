import React, { useEffect, useState } from "react";
import "./Admin.css";

function PregledRezervacij() {
    const [rezervacije, setRezervacije] = useState([]);
    const [loading, setLoading] = useState(true);
    const [napaka, setNapaka] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/rezervacije`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Napaka pri pridobivanju rezervacij.");
                }
                return res.json();
            })
            .then((data) => {
                setRezervacije(data);
                setLoading(false);
            })
            .catch((err) => {
                setNapaka(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <h2 style={{ marginTop: "5em" }}>Nalaganje...</h2>;
    if (napaka) return <h2>Napaka: {napaka}</h2>;

    // Združi rezervacije po koncertu
    const zdruzenePoKoncertih = rezervacije.reduce((acc, rezervacija) => {
        const { koncertId, koncertIme, ime, email, steviloVstopnic } = rezervacija;
        if (!acc[koncertId]) {
            acc[koncertId] = {
                koncertIme,
                rezervacije: [],
                skupno: 0,
            };
        }
        acc[koncertId].rezervacije.push({ ime, email, steviloVstopnic });
        acc[koncertId].skupno += parseInt(steviloVstopnic);
        return acc;
    }, {});

    return (
        <div className="pregled-rezervacij-container">
            <h1>Pregled rezervacij</h1>
            {Object.entries(zdruzenePoKoncertih).map(([koncertId, data]) => (
                <div key={koncertId} className="rezervacija-kartica">
                    <h2>{data.koncertIme}</h2>
                    <ul>
                        {data.rezervacije.map((r, index) => (
                            <li key={index}>
                                <strong>Kdo: {r.ime},</strong>{r.email}, {r.steviloVstopnic} vstopnica/e
                            </li>
                        ))}
                    </ul>
                    <p className="skupno-vstopnic">Skupaj rezerviranih vstopnic: <strong>{data.skupno}</strong></p>
                </div>
            ))}
        </div>
    );
}

export default PregledRezervacij;
