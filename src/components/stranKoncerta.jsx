import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {IoIosArrowBack} from "react-icons/io";
import axios from "axios";

function StranKoncerta() {
    const { id } = useParams();

    // 📌 HOOKI NA VRHU
    const [koncert, setKoncert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ime, setIme] = useState("");
    const [email, setEmail] = useState("");
    const [steviloVstopnic, setSteviloVstopnic] = useState("");

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

    const formatirajDatum = (datum) => {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);
        const ure = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${ure}:${minute}`;
    };

    const toRoman = (num) => {
        const romanMap = [
            ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
            ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
            ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
        ];

        return romanMap.reduce((acc, [letter, value]) => {
            while (num >= value) {
                acc += letter;
                num -= value;
            }
            return acc;
        }, "");
    };

    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [vir, setVir] = useState("");
    const [drugiVir, setDrugiVir] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!privacyChecked) {
            alert("Prosimo, da se strinjate s pravilnikom o zasebnosti.");
            return;
        }
        const poslaniVir = vir === "drugo" ? drugiVir : vir;



        const novaRezervacija = {
            ime,
            email,
            steviloVstopnic,
            koncertId: koncert._id,
            koncertIme: koncert.ime,
            koncertDatum: koncert.datum,
            koncertLokacija: koncert.lokacija,
            vir: poslaniVir,
        };

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rezervacije`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaRezervacija),
            });

            if (res.ok) {
                alert("Rezervacija uspešna!");
                setIme("");
                setEmail("");
                setSteviloVstopnic("");
            } else {
                alert("Napaka pri pošiljanju rezervacije.");
            }
        } catch (err) {
            console.error("Napaka pri pošiljanju rezervacije:", err);
            alert("Napaka pri povezavi s strežnikom.");
        }
    };

    //  POGOJI ZA NALAGANJE/ERROR
    if (loading) return <h2 style={{ marginTop: "8em" }}>Nalaganje...</h2>;
    if (error) return <h2>{error}</h2>;

    // slike
    const images = koncert.slike.map((slika) => ({
        original: slika,
        thumbnail: slika,
    }));

    const izvajalciData = typeof koncert.izvajalci === "string"
        ? JSON.parse(koncert.izvajalci)
        : koncert.izvajalci;


    const razdeliPoDvehBesedah = (besedilo) => {
        const besede = besedilo.split(" ");
        const deli = [];
        for (let i = 0; i < besede.length; i += 2) {
            deli.push(besede.slice(i, i + 2).join(" "));
        }
        return deli;
    };

    const VsebinaKoncert = ({ vsebina }) => {
        const [razsirjeno, setRazsirjeno] = useState(false);

        const skrajsajVsebino = (text, steviloBesed = 80) => {
            const besede = text.split(' ');
            if (besede.length <= steviloBesed) return text;
            return besede.slice(0, steviloBesed).join(' ') + '...';
        };

        const toggleRazsirjeno = () => {
            setRazsirjeno(!razsirjeno);
        };

        return (
            <>
                <p style={{ lineHeight: "1.6" }}>
                    {razsirjeno ? vsebina : skrajsajVsebino(vsebina)}
                </p>
                {vsebina.split(' ').length > 80 && (
                    <button
                        onClick={toggleRazsirjeno}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#4C7F93",
                            cursor: "pointer",
                            marginTop: "0.5em",
                            fontSize: "1em",
                            textDecoration: "none"
                        }}
                    >
                        {razsirjeno ? "Pokaži manj" : "Preberi več.."}
                    </button>
                )}
            </>
        );
    };



    return (
        <div>
            <section className="koncert-stran center">
                <div className="koncert-levo">
                    <Link to="/koncerti" className="gumb-nazaj-aan center">
                        <IoIosArrowBack /> Nazaj na koncerte
                    </Link>
                    <h1>{koncert.ime}</h1>
                    {/*<p style={{ color: "grey" }}>{koncert.podnaslov}</p>*/}
                    <p><FaRegCalendarAlt style={{ marginRight: "10px" }}/>{formatirajDatum(koncert.datum)}</p>
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={4000}
                        showFullscreenButton={false}
                    />
                </div>

                <div className="koncert-desno">
                    <div className="koncert-stran-vsebina">
                        <h1>O koncertu</h1>

                        <p><VsebinaKoncert vsebina={koncert.vsebina} /></p>



                    </div>
                </div>
            </section>

            <section className="center koncert-program">
                <div className="izvajalci-pri-programu">
                    <div className="izvajalci-pri-programu-tekst">
                        <h1>Izvajalci:</h1>
                        <hr />
                        {izvajalciData.map((skupina, index) => (
                            <div key={index} className="izvajalci-karta">
                                {skupina.imeSkupine && <h3>{skupina.imeSkupine}</h3>}
                                {skupina.izvajalci.map((izvajalec, idx) => (
                                    <p key={idx}>
                                        <b>{izvajalec.ime}</b> - {izvajalec.instrument}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="center">
                    <div className="stran-koncerta-program-wrapper">
                        <div className="center-program">
                            <h1>Program:</h1>
                            <hr style={{ width: "10%" }} />
                        </div>

                        <div className="array-program">
                            {koncert.program.map((item, index) => (
                                <div key={index}>
                                    <h3>{item.skladatelj}: {item.naslov}</h3>
                                    {Array.isArray(item.stavki) && item.stavki.map((stavek, idx) => (
                                        <p key={idx}>
                                            <b>{toRoman(idx + 1)}.</b> {stavek}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className="rezervacija-vstopnic center">
                <div className="rezervacija-vstopnic-levo">
                    <h1>Rezervacija brezplačnih vstopnic</h1>
                    <form className="rezervacija-vstopnic-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Ime in priimek"
                            value={ime}
                            onChange={(e) => setIme(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Št. vstopnic"
                            className="input-st-kart"
                            value={steviloVstopnic}
                            onChange={(e) => setSteviloVstopnic(e.target.value)}
                            required
                        />
                        <label className="vir-mb" htmlFor="vir">Kje ste izvedeli za koncert?</label>
                        <select className="vir-select" id="vir" name="vir" value={vir} onChange={e => setVir(e.target.value)}>
                            <option value="">-- izberi --</option>
                            <option value="družabna omrežja">Na družabnih omrežjih</option>
                            <option value="plakati">S plakatov</option>
                            <option value="časopisi">Iz časopisov</option>
                            <option value="radio">Po radiu</option>
                            <option value="drugo">Drugo</option>
                        </select>

                        {vir === "drugo" && (
                            <input
                                type="text"
                                placeholder="Drugo"
                                value={drugiVir}
                                onChange={e => setDrugiVir(e.target.value)}
                            />
                        )}

                        <div className="checkbox-wrapper" style={{ margin: "1em 0", fontSize: "0.95em" }}>
                            <input
                                type="checkbox"
                                id="privacy"
                                checked={privacyChecked}
                                onChange={(e) => setPrivacyChecked(e.target.checked)}
                                required
                            />
                            <label htmlFor="privacy" style={{ marginLeft: "0.5em" }}>
                                Strinjam se s <a href="/pravilnik-zasebnosti" target="_blank" style={{ color: "#4C7F93" }}>pogoji zasebnosti</a>.
                            </label>
                        </div>
                        <button type="submit" className="koncert-gumb">Rezerviraj</button>
                    </form>
                </div>

                <div className="rezervacija-vstopnic-desno center">
                    <h1>Podrobnosti koncerta</h1>
                    <div className="koncert-desno-info center" style={{ backgroundColor: "unset", boxShadow: "none" }}>
                        <h3>
                            <h4><FaRegCalendarAlt style={{ marginRight: "10px" }} /></h4>
                            {razdeliPoDvehBesedah(formatirajDatum(koncert.datum)).map((del, i) => (
                                <span key={i}>
                                    {del}
                                    <br />
                                 </span>
                            ))}
                        </h3>
                        <h3>
                            <h4><FaLocationDot style={{ marginRight: "10px" }} /></h4>
                            {razdeliPoDvehBesedah(koncert.lokacija).map((del, i) => (
                                <span key={i}>
                                    {del}
                                    <br />
                                </span>
                            ))}
                        </h3>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StranKoncerta;
