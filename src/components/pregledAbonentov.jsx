import React, { useEffect, useState } from "react";
import "./Admin.css";

function PregledAbonentov() {
    const [rezervacije, setRezervacije] = useState([]);
    const [loading, setLoading] = useState(true);
    const [napaka, setNapaka] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/abonent`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Napaka pri pridobivanju abonentov.");
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


    return (
        <div className="pregled-rezervacij-container">
            <h1>Pregled Abonentov</h1>
            <div>
                {rezervacije.length === 0 ? (
                    <p>Ni prijavljenih abonentov.</p>
                ) : (
                    <table className="abonenti-table">
                        <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rezervacije.map((abonent, index) => (
                            <tr key={index}>
                                <td>{abonent.name}</td>
                                <td>{abonent.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

export default PregledAbonentov;
