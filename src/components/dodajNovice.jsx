import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const DodajNovice = () => {
    const [ime, setIme] = useState("");
    const [podnaslov, setPodnaslov] = useState("");
    const [datum, setDatum] = useState("");
    const [slike, setSlike] = useState([]);
    const [sekcije, setSekcije] = useState([{ datum: "", podpodnaslov: "", vsebina: "" }]);
    const [seShranjuje, setSeShranjuje] = useState(false);
    const [novice, setNovice] = useState([]);
    const [urejanjeId, setUrejanjeId] = useState(null);
    const [potrdiBrisanjeId, setPotrdiBrisanjeId] = useState(null);

    useEffect(() => {
        fetchNovice();
    }, []);

    const fetchNovice = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice`);
            const data = await res.json();
            setNovice(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Napaka pri pridobivanju novic:", err);
        }
    };

    const handleSlikeChange = (e) => {
        setSlike([...e.target.files]);
    };

    const handleSekcijaChange = (index, field, value) => {
        const updated = [...sekcije];
        updated[index][field] = value;
        setSekcije(updated);
    };

    const dodajSekcijo = () => {
        setSekcije([...sekcije, { datum: "", podpodnaslov: "", vsebina: "" }]);
    };

    const odstraniSekcijo = (index) => {
        const updated = sekcije.filter((_, i) => i !== index);
        setSekcije(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSeShranjuje(true);

        const formData = new FormData();
        formData.append("ime", ime);
        formData.append("podnaslov", podnaslov);
        formData.append("datum", datum);
        formData.append("sekcije", JSON.stringify(sekcije));
        slike.forEach((slika) => formData.append("slike", slika));

        try {
            const url = urejanjeId
                ? `${process.env.REACT_APP_BACKEND_URL}/novice/${urejanjeId}`
                : `${process.env.REACT_APP_BACKEND_URL}/novice/dodaj`;

            const method = urejanjeId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: formData,
            });

            if (res.ok) {
                alert(urejanjeId ? "✅ Novica posodobljena!" : "✅ Novica dodana!");
                resetForm();
                fetchNovice();
            } else {
                const err = await res.json();
                alert("Napaka: " + err.message);
            }
        } catch (err) {
            console.error("Napaka:", err);
            alert("Napaka pri pošiljanju.");
        } finally {
            setSeShranjuje(false);
        }
    };

    const resetForm = () => {
        setIme("");
        setPodnaslov("");
        setDatum("");
        setSlike([]);
        setSekcije([{ datum: "", podpodnaslov: "", vsebina: "" }]);
        setUrejanjeId(null);
    };

    const naloziZaUrejanje = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice/${id}`);
            const data = await res.json();

            setIme(data.ime || "");
            setPodnaslov(data.podnaslov || "");
            setDatum(data.datum?.slice(0, 16) || "");
            setSekcije(data.sekcije || []);
            setUrejanjeId(id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error("Napaka pri nalaganju novice:", err);
        }
    };

    const izbrisiNovico = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Novica uspešno zbrisana!.");
                setNovice(novice.filter((n) => n._id !== id));
            } else {
                const err = await res.json();
                alert("Napaka: " + err.message);
            }
        } catch (err) {
            console.error("Napaka pri brisanju:", err);
        } finally {
            setPotrdiBrisanjeId(null);
        }
    };

    const formatirajDatum = (d) => new Date(d).toLocaleString("sl-SI");

    return (
        <div>
            <div className="dodaj-koncert">
                <h2>{urejanjeId ? "Uredi Novico" : "Dodaj Novico"}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Naslov" value={ime} onChange={(e) => setIme(e.target.value)} required />
                    <input type="text" placeholder="Podnaslov" value={podnaslov} onChange={(e) => setPodnaslov(e.target.value)} />
                    <input type="datetime-local" value={datum} onChange={(e) => setDatum(e.target.value)} required />

                    <h3>Sekcije</h3>
                    {sekcije.map((sekcija, index) => (
                        <div key={index} className="sekcija">
                            <input
                                type="datetime-local"
                                value={sekcija.datum}
                                onChange={(e) => handleSekcijaChange(index, "datum", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Podpodnaslov"
                                value={sekcija.podpodnaslov}
                                onChange={(e) => handleSekcijaChange(index, "podpodnaslov", e.target.value)}
                            />
                            <textarea
                                placeholder="Vsebina sekcije"
                                value={sekcija.vsebina}
                                onChange={(e) => handleSekcijaChange(index, "vsebina", e.target.value)}
                                required
                            />
                            <button type="button" className="odstrani" onClick={() => odstraniSekcijo(index)}>Izbriši sekcijo</button>
                        </div>
                    ))}
                    <button type="button" className="dodaj-gumb" onClick={dodajSekcijo}>Dodaj sekcijo</button>

                    <input type="file" multiple onChange={handleSlikeChange} />
                    {seShranjuje && <p style={{ color: "green" }}>Evo se shranjuje :D ..</p>}
                    <button type="submit">{urejanjeId ? "Shrani spremembe" : "Shrani Novico"}</button>
                </form>

            </div>
            <h2 className="center" style={{ marginTop: "1em" }}>Urejanje novic</h2>
            <div className="spreminjanje-koncertov center">
                <div className="seznam-novic">
                    {novice.map((novica) => (
                        <div key={novica._id} className="spreminjanje-koncertov-karta">
                            {novica.slike && novica.slike.length > 0 && (
                                <img
                                    src={novica.slike[0]}
                                    alt={novica.ime}
                                    className="stran-novice-slika"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: 0 }}>{novica.ime}</h3>
                            </div>
                            <div className="center mal-gapa">
                                <button
                                    onClick={() => naloziZaUrejanje(novica._id)}
                                    className="center"
                                >
                                    <FaRegEdit style={{ marginRight: "8px" }} /> Uredi
                                </button>
                                <button
                                    onClick={() => setPotrdiBrisanjeId(novica._id)}
                                    className="center izbris-gumb"
                                >
                                    <MdDeleteOutline style={{ marginRight: "8px" }} /> Izbriši
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                {potrdiBrisanjeId && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>A si ziher da bi izbrisal to novico?</h3>
                            <div className="modal-buttons">
                                <button className="potrdi" onClick={() => izbrisiNovico(potrdiBrisanjeId)}>Mhm</button>
                                <button className="preklici" onClick={() => setPotrdiBrisanjeId(null)}>Ne!</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DodajNovice;
