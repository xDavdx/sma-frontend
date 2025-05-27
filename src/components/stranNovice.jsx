import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
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

    const formatirajDatum = (datum) => {
        const meseci = [
            "januar", "februar", "marec", "april", "maj", "junij",
            "julij", "avgust", "september", "oktober", "november", "december"
        ];
        const date = new Date(datum);
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    if (!novica) return <p>Nalaganje...</p>;

    return (
        <div className="stran-novice-wrapper">
            <div className="stran-novice-content center">
                <div className="leva-stran">
                    <Link to="/novice" className="gumb-nazaj-aan">
                        <IoIosArrowBack /> Nazaj na novice
                    </Link>
                    <h1>{novica.ime}</h1>
                    <h3>{novica.podnaslov}</h3>
                    {novica.slike && novica.slike.length > 0 && (
                        <img
                            src={novica.slike[0]}
                            alt={novica.ime}
                            className="stran-novice-slika"
                        />
                    )}
                </div>
            </div>

            <div className="novica-spodaj-content">
                {novica.vsebina && (
                    <div className="vsebina" dangerouslySetInnerHTML={{ __html: novica.vsebina }} />
                )}

                {novica.sekcije && novica.sekcije.length > 0 && novica.sekcije.map((sekcija, idx) => (
                    <div key={idx} className="novica-sekcija">
                        {sekcija.datum && (
                            <h5>{formatirajDatum(sekcija.datum)}</h5>
                        )}
                        {sekcija.podpodnaslov && <h3>{sekcija.podpodnaslov}</h3>}
                        <p>{sekcija.vsebina}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StranNovice;
