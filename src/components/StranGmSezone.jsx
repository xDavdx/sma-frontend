import React from "react";
import { useParams } from "react-router-dom";
import { gmSezone } from "./gmSezone"; // Uvozi podatke o sezonah

const SezonaDetail = () => {
    const { leto } = useParams(); // Pridobi leto iz URL-ja
    const sezona = gmSezone.find((s) => s.leto === parseInt(leto)); // Poišči sezono glede na leto

    if (!sezona) {
        return <div>Sezona ni najdena.</div>;
    }

    return (
        <section className="sezona-podrobnosti">
            <div className="sezona-podrobnosti-header">
                <img src={sezona.logo} alt={sezona.ime} className="sezona-logo" />
                <h1>{sezona.ime}</h1>
            </div>

            <div className="sezona-podrobnosti-vsebina">
                <h2>Vsebina</h2>
                {sezona.vsebina.split('\n').map((line, index) => (
                    <p style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                ))}
            </div>

            <div className="sezona-podrobnosti-slika">
                <img src={sezona.slika1} alt="Slika 1" className="sezona-slika" />
                <img src={sezona.slika2} alt="Slika 2" className="sezona-slika" />
            </div>
        </section>
    );
};

export default SezonaDetail;
