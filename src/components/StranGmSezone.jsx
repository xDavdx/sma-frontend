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

            {/* MALA MLADA GLASBA */}
            {(sezona.naslov1 || sezona.vsebina1 || (sezona.linkiMmg && sezona.linkiMmg.length > 0)) && (
                <section className="stran-gm-sezone-vsebina">
                    <div className="sezona-podrobnosti-vsebina">
                        {sezona.naslov1 && <h2>{sezona.naslov1}</h2>}
                        {sezona.vsebina1 && sezona.vsebina1.split('\n').map((line, index) => (
                            <p style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                        ))}
                        {sezona.linkiMmg && sezona.linkiMmg.length > 0 && (
                            <div className="sezona-linki">
                                <h3>Posnetek koncerta je bil predvajan po Radiu Ars, poslušate si jih lahko na povezavah:</h3>
                                <ul>
                                    {sezona.linkiMmg.map((item, index) => (
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
                    {(sezona.logo || sezona.slika1 || sezona.slika2) && (
                        <div className="sezona-podrobnosti-slika">
                            {sezona.logo && <img src={sezona.logo} alt="Slika 1" className="sezona-slika" />}
                            {sezona.logo && <img src={sezona.logo} alt="Slika 2" className="sezona-slika" />}
                        </div>
                    )}
                </section>
            )}





            {(sezona.oProjektu || sezona.vizija) && (
                <section className="mmg2023-flexbox">
                    {sezona.oProjektu && (
                        <div>
                            <h2>O projektu</h2>
                            {sezona.oProjektu.split('\n').map((line, index) => (
                                <p className="ln14" style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                            ))}
                        </div>
                    )}
                    {sezona.vizija && (
                        <div>
                            <h2>Vizija</h2>
                            {sezona.vizija.split('\n').map((line, index) => (
                                <p className="ln14" style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                            ))}
                        </div>
                    )}
                </section>
            )}



            {(sezona.programMmg && sezona.programMmg.length > 0) && (
                <section className="koncert-program center">
                    <div className="izvajalci-pri-programu">
                        {sezona.logo && (
                            <img src={sezona.logo} alt="sezona 2023 program" style={{ width: "70%", borderRadius: "10px" }} />
                        )}
                    </div>
                    <div className="center">
                        <div className="stran-koncerta-program-wrapper">
                            <div className="center-program">
                                <h1>Program:</h1>
                                <hr style={{ width: "10%" }} />
                            </div>
                            <div className="array-program">
                                <div className="sezona-program">
                                    <ul>
                                        {sezona.programMmg.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.skladatelj}</strong> – {item.naslov}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}








            {(sezona.naslov || sezona.vsebina || (sezona.linki && sezona.linki.length > 0)) && (
                <section className="stran-gm-sezone-vsebina">
                    <div className="sezona-podrobnosti-vsebina">
                        {sezona.naslov && <h2>{sezona.naslov}</h2>}
                        {sezona.vsebina && sezona.vsebina.split('\n').map((line, index) => (
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
                    {(sezona.slika1 || sezona.slika2) && (
                        <div className="sezona-podrobnosti-slika">
                            {sezona.slika1 && <img src={sezona.slika1} alt="Slika 1" className="sezona-slika" />}
                            {sezona.slika2 && <img src={sezona.slika2} alt="Slika 2" className="sezona-slika" />}
                        </div>
                    )}
                </section>
            )}


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



            {/* ANSANBEL GLASBA MLADIH */}
            {(sezona.naslov3 || sezona.vsebina3) && (
                <section className="ansanbel-gm-sredina">
                    {sezona.naslov3 && (
                        <div>
                            <h2>{sezona.naslov3}</h2>
                            {sezona.vsebina3.split('\n').map((line, index) => (
                                <p className="ln14" style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                            ))}
                        </div>
                    )}
                    <div className="center">
                        {(sezona.slika1 || sezona.slika2) && (
                            <div className="sezona-podrobnosti-slika">
                                {sezona.slika1 && <img src={sezona.slika1} alt="Slika 1" className="sezona-slika" />}
                                {sezona.slika2 && <img src={sezona.slika2} alt="Slika 2" className="sezona-slika" />}
                            </div>
                        )}
                    </div>
                </section>
            )}




            {(sezona.naslov4 || sezona.vsebina4) && (
                <section className="stran-gm-sezone-vsebina">
                    <div className="sezona-podrobnosti-vsebina">
                        {sezona.naslov4 && <h2>{sezona.naslov4}</h2>}
                        {sezona.vsebina4 && sezona.vsebina4.split('\n').map((line, index) => (
                            <p style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                        ))}
                    </div>
                    {(sezona.logo || sezona.slika1 || sezona.slika2) && (
                        <div className="sezona-podrobnosti-slika">
                            {sezona.logo && <img src={sezona.logo} alt="Slika 1" className="sezona-slika" />}
                            {sezona.logo && <img src={sezona.logo} alt="Slika 2" className="sezona-slika" />}
                        </div>
                    )}
                </section>
            )}
            {(sezona.naslov41 || sezona.vsebina41) && (
                <section className="ansanbel-gm-sredina">
                    {sezona.naslov41 && (
                        <div>
                            <h2>{sezona.naslov41}</h2>
                            {sezona.vsebina3.split('\n').map((line, index) => (
                                <p className="ln14" style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                            ))}
                        </div>
                    )}
                    <div className="center">
                        {(sezona.slika1 || sezona.slika2) && (
                            <div className="sezona-podrobnosti-slika">
                                {sezona.slika1 && <img src={sezona.slika1} alt="Slika 1" className="sezona-slika" />}
                                {sezona.slika2 && <img src={sezona.slika2} alt="Slika 2" className="sezona-slika" />}
                            </div>
                        )}
                    </div>
                </section>
            )}




            {(sezona.naslov2 || sezona.vsebina2 || (sezona.linki2 && sezona.linki2.length > 0)) && (
                <section className="stran-gm-sezone-vsebina">
                    <div className="sezona-podrobnosti-vsebina">
                        {sezona.naslov2 && <h2>{sezona.naslov2}</h2>}
                        {sezona.vsebina2 && sezona.vsebina2.split('\n').map((line, index) => (
                            <p style={{ marginBottom: "0.5em" }} key={index}>{line}</p>
                        ))}
                        {sezona.linki2 && sezona.linki2.length > 0 && (
                            <div className="sezona-linki">
                                <h3>Posnetek koncerta je bil predvajan po Radiu Ars, poslušate si jih lahko na povezavah:</h3>
                                <ul>
                                    {sezona.linki2.map((item, index) => (
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
                    {(sezona.logo || sezona.slika1 || sezona.slika2) && (
                        <div className="sezona-podrobnosti-slika">
                            {sezona.logo && <img src={sezona.logo} alt="Slika 1" className="sezona-slika" />}
                            {sezona.logo && <img src={sezona.logo} alt="Slika 2" className="sezona-slika" />}
                        </div>
                    )}
                </section>
            )}

            {/* PROGRAM 2 */}
            {sezona.naslov2 && (
                <section className="koncert-program center">
                    <div className="izvajalci-pri-programu">
                        <div className="izvajalci-pri-programu-tekst">
                            <h1>Izvajalci</h1>
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
            {sezona.naslov4 && (
                <section className="koncert-program center">
                    <div className="izvajalci-pri-programu">
                        <div className="izvajalci-pri-programu-tekst">
                            <h1>Izvajalci</h1>
                            <hr />
                            {sezona.izvajalci4 && sezona.izvajalci4.length > 0 && (
                                <div className="izvajalci-karta">
                                    <ul>
                                        {sezona.izvajalci4.map((oseba, index) => (
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
                                {sezona.program4 && sezona.program4.length > 0 && (
                                    <div className="sezona-program">
                                        <ul>
                                            {sezona.program4.map((item, index) => (
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
