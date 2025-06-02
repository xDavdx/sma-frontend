import React from "react";
import { useParams } from "react-router-dom";
import { gmSezone } from "./gmSezone";
import logo from "./sma-logo-font.png";

const SezonaDetail = () => {
    const { leto } = useParams();
    const sezona = gmSezone.find((s) => s.leto === parseInt(leto));

    if (!sezona) {
        return <div>Sezona ni najdena.</div>;
    }

    return (
        <section className="sezona-podrobnosti">
            <section className="onas-uvod">
                <div className="onas-uvod-container">
                    <div className="onas-uvod-left"></div>
                    <div className="onas-uvod-center">
                        <h1>{sezona.ime}</h1>
                    </div>
                    <div className="onas-uvod-right"></div>
                </div>
            </section>

            <section className="stran-gm-sezone-vsebina">
                <div className="sezona-podrobnosti-vsebina">
                    <h2>Vsebina</h2>
                    {sezona.vsebina.split('\n').map((line, index) => (
                        <p style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                    ))}

                    {sezona.linki && sezona.linki.length > 0 && (
                        <div className="sezona-linki">
                            <h2>Povezave</h2>
                            <ul>
                                {sezona.linki.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="sezona-podrobnosti-slika">
                    <img src={sezona.slika1} alt="Slika 1" className="sezona-slika" />
                    <img src={sezona.slika2} alt="Slika 2" className="sezona-slika" />
                </div>
            </section>

            {/* PROGRAM 1 */}
            <section className="koncert-program center">
                <div className="izvajalci-pri-programu">
                    <div className="izvajalci-pri-programu-tekst">
                        <h1>Izvajalci:</h1>
                        <hr />
                        {sezona.izvajalci && sezona.izvajalci.length > 0 && (
                            <div className="izvajalci-karta">
                                <ul>
                                    {sezona.izvajalci.map((oseba, index) => (
                                        <li key={index}>
                                            {oseba.ime} – {oseba.instrument}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="center">
                    <div className="stran-koncerta-program-wrapper">
                        <div className="center-program">
                            <h1>Program:</h1>
                            <hr style={{ width: "10%" }} />
                        </div>

                        <div className="array-program">
                            {sezona.program1 && sezona.program1.length > 0 && (
                                <div className="sezona-program">
                                    <ul>
                                        {sezona.program1.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.skladatelj}</strong> – {item.naslov}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROGRAM 2 */}
            {sezona.naslov2 && (
                <section className="koncert-program center">
                    <div className="izvajalci-pri-programu">
                        <div className="izvajalci-pri-programu-tekst">
                            <h1>{sezona.naslov2}</h1>
                            <hr />
                            {sezona.izvajalci2 && sezona.izvajalci2.length > 0 && (
                                <div className="izvajalci-karta">
                                    <ul>
                                        {sezona.izvajalci2.map((oseba, index) => (
                                            <li key={index}>
                                                {oseba.ime} – {oseba.instrument}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="center">
                        <div className="stran-koncerta-program-wrapper">
                            <div className="center-program">
                                <h1>Program:</h1>
                                <hr style={{ width: "10%" }} />
                            </div>

                            <div className="array-program">
                                {sezona.program2 && sezona.program2.length > 0 && (
                                    <div className="sezona-program">
                                        <ul>
                                            {sezona.program2.map((item, index) => (
                                                <li key={index}>
                                                    <strong>{item.skladatelj}</strong> – {item.naslov}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* PROGRAM 3 */}
            {sezona.naslov3 && (
                <section className="koncert-program center">
                    <div className="izvajalci-pri-programu">
                        <div className="izvajalci-pri-programu-tekst">
                            <h1>{sezona.naslov3}</h1>
                            <hr />
                            {sezona.izvajalci3 && sezona.izvajalci3.length > 0 && (
                                <div className="izvajalci-karta">
                                    <ul>
                                        {sezona.izvajalci3.map((oseba, index) => (
                                            <li key={index}>
                                                {oseba.ime} – {oseba.instrument}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="center">
                        <div className="stran-koncerta-program-wrapper">
                            <div className="center-program">
                                <h1>Program:</h1>
                                <hr style={{ width: "10%" }} />
                            </div>

                            <div className="array-program">
                                {sezona.program3 && sezona.program3.length > 0 && (
                                    <div className="sezona-program">
                                        <ul>
                                            {sezona.program3.map((item, index) => (
                                                <li key={index}>
                                                    <strong>{item.skladatelj}</strong> – {item.naslov}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </section>
    );
};

export default SezonaDetail;
