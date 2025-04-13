import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import "./Novice.css";

const StranNovice = () => {
    const { id } = useParams();
    const [novica, setNovica] = useState(null);

    useEffect(() => {
        const fetchNovica = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice/${id}`);
                const data = await res.json();
                setNovica(data);
            } catch (err) {
                console.error("Napaka pri pridobivanju novice:", err);
            }
        };

        fetchNovica();
    }, [id]);

    if (!novica) return <p>Nalaganje...</p>;

    return (
        <div className="stran-novice-wrapper">
            <div className="stran-novice-content">
                <div className="leva-stran">
                    <Link to="/novice" className="gumb-nazaj-na-koncerte gumb-nazaj-novice">
                       Nazaj na novice
                    </Link>
                    <h1>{novica.ime}</h1>
                    <h3>{novica.podnaslov}</h3>
                    {novica.slike && novica.slike.length > 0 && (
                        <img
                            src={novica.slike[0]}
                            alt="Novica"
                            className="stran-novice-slika"
                        />
                    )}
                </div>
                <div className="desna-stran">
                    <div className="vsebina" dangerouslySetInnerHTML={{ __html: novica.vsebina }} />
                </div>
            </div>
        </div>
    );
};

export default StranNovice;
