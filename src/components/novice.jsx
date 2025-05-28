import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Novice.css";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";

const Novice = () => {
    const [novice, setNovice] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNovice = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice`);
                const data = await res.json();
                setNovice(data);
            } catch (err) {
                console.error("Napaka pri pridobivanju novic:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNovice();
    }, []);

    const featured = novice[0];
    const nextThree = novice.slice(1, 4);
    const remaining = novice.slice(4);

    const renderSlika = (novica) => {
        if (!novica.slike || novica.slike.length === 0) return null;
        return (
            <img
                src={novica.slike[0]}
                alt="Novica"
                className="novica-slika"
            />
        );
    };

    function prikaziKrajseBesedilo(besedilo, steviloBesed = 10) {
        const besede = besedilo.split(" ");
        if (besede.length <= steviloBesed) return besedilo;
        return besede.slice(0, steviloBesed).join(" ") + "...";
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <TailSpin
                    height="80"
                    width="80"
                    color="#0074D9"
                    ariaLabel="loading"
                />
            </div>
        );
    }

    return (
        <div className="novice-wrapper">
            <Helmet>
                <title>SMA - Novice</title>
                <meta name="description" content="S svojim trudom si želimo pomagati mladim slovenskim umetnikom, ki iščejo pot do profesionalne kariere" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* Glavna novica + 3 naslednje */}
            <section className="featured-section center">
                <div className="featured-grid">
                    {featured && (
                        <div className="featured-main">
                            {renderSlika(featured)}
                            <h2>{featured.ime}</h2>
                            <p>{prikaziKrajseBesedilo(featured.podnaslov)}</p>
                            <Link to={`/novice/${featured._id}`} className="preberi-vec">Preberi več</Link>
                        </div>
                    )}
                    <div className="featured-side">
                        {nextThree.map((novica, index) => (
                            <div key={index} className="side-novica">
                                {renderSlika(novica)}
                                <div className="side-novica-content">
                                    <h3>{novica.ime}</h3>
                                    <p>{novica.podnaslov}</p>
                                    <Link to={`/novice/${novica._id}`} className="preberi-vec">Preberi več</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vse ostale novice */}
            <section className="all-novice">
                <Link to={"/admin-dodajaj"}><h1 className="koncert-gumb dodaj-koncerte-gumb">+ Dodaj novico</h1></Link>
                <h2>Vse novice</h2>
                <div className="novice-grid">
                    {remaining.map((novica, index) => (
                        <div key={index} className="novica-card">
                            {renderSlika(novica)}
                            <h3>{novica.ime}</h3>
                            <p>{novica.podnaslov}</p>
                            <Link to={`/novice/${novica._id}`} className="preberi-vec">Preberi več</Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Novice;
