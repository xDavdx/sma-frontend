import React, { useState, useEffect } from "react";
import {FaRegCalendarAlt} from "react-icons/fa";

const DodajKoncerte = () => {
    const [ime, setIme] = useState("");
    const [podnaslov, setPodnaslov] = useState("");
    const [datum, setDatum] = useState("");
    const [lokacija, setLokacija] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [programItems, setProgramItems] = useState([
        { skladatelj: "", naslov: "", stavki: [""] }
    ]);

    const [cikel, setCikel] = useState("mlada klasika");
    const [slike, setSlike] = useState([]);
    const [seShranjuje, setSeShranjuje] = useState(false);

    const [skupine, setSkupine] = useState([{ imeSkupine: "", izvajalci: [{ ime: "", instrument: "" }] }]);

    const handleSlikaChange = (e) => {
        setSlike([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSeShranjuje(true);

        const formData = new FormData();
        formData.append("ime", ime);
        formData.append("podnaslov", podnaslov);
        formData.append("datum", datum);
        formData.append("lokacija", lokacija);
        formData.append("vsebina", vsebina);
        formData.append("program", JSON.stringify(programItems));
        formData.append("cikel", cikel);

        // Poslano bo kot seznam skupin z izvajalci
        formData.append("izvajalci", JSON.stringify(skupine));

        slike.forEach((slika) => {
            formData.append("slike", slika);
        });

        try {
            const url = editingKoncertId
                ? `${process.env.REACT_APP_BACKEND_URL}/koncerti/uredi/${editingKoncertId}`
                : `${process.env.REACT_APP_BACKEND_URL}/koncerti/dodaj`;

            const method = editingKoncertId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (response.ok) {
                alert(editingKoncertId ? "Koncert uspešno posodobljen!" : "Koncert uspešno dodan!");
                setEditingKoncertId(null); // Reset
                // Po potrebi sprazni formo
            } else {
                const errorResponse = await response.json();
                alert("Napaka: " + errorResponse.message);
            }
        } catch (error) {
            console.error("Napaka pri pošiljanju podatkov:", error);
            alert("Napaka pri pošiljanju podatkov.");
        } finally {
            setSeShranjuje(false);
        }
    };

    const handleAddSkupina = () => {
        setSkupine([...skupine, { imeSkupine: "", izvajalci: [{ ime: "", instrument: "" }] }]);
    };

    const handleRemoveSkupina = (index) => {
        const newSkupine = [...skupine];
        newSkupine.splice(index, 1);
        setSkupine(newSkupine);
    };

    const handleSkupinaChange = (index, field, value) => {
        const newSkupine = [...skupine];
        newSkupine[index][field] = value;
        setSkupine(newSkupine);
    };

    const handleAddIzvajalec = (skupinaIndex) => {
        const newSkupine = [...skupine];
        newSkupine[skupinaIndex].izvajalci.push({ ime: "", instrument: "" });
        setSkupine(newSkupine);
    };

    const handleRemoveIzvajalec = (skupinaIndex, izvajalecIndex) => {
        const newSkupine = [...skupine];
        newSkupine[skupinaIndex].izvajalci.splice(izvajalecIndex, 1);
        setSkupine(newSkupine);
    };

    const handleIzvajalecChange = (skupinaIndex, izvajalecIndex, field, value) => {
        const newSkupine = [...skupine];
        newSkupine[skupinaIndex].izvajalci[izvajalecIndex][field] = value;
        setSkupine(newSkupine);
    };

    const handleProgramChange = (index, field, value) => {
        const newProgram = [...programItems];
        newProgram[index][field] = value;
        setProgramItems(newProgram);
    };

    const handleStavekChange = (programIdx, stavekIdx, value) => {
        const newProgram = [...programItems];
        newProgram[programIdx].stavki[stavekIdx] = value;
        setProgramItems(newProgram);
    };

    const addStavek = (programIdx) => {
        const newProgram = [...programItems];
        newProgram[programIdx].stavki.push("");
        setProgramItems(newProgram);
    };

    const addProgramItem = () => {
        setProgramItems([...programItems, { skladatelj: "", naslov: "", stavki: [""] }]);
    };

    const handleRemoveStavek = (itemIndex, stavekIndex) => {
        setProgramItems((prev) => {
            const novi = [...prev];
            novi[itemIndex].stavki.splice(stavekIndex, 1);
            return novi;
        });
    };

    const handleRemoveProgramItem = (itemIndex) => {
        setProgramItems((prev) => prev.filter((_, i) => i !== itemIndex));
    };


    const [editingKoncertId, setEditingKoncertId] = useState(null); // <-- NOVO

    const naloziKoncertZaUrejanje = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti/${id}`);
            const data = await response.json();

            setIme(data.ime || "");
            setPodnaslov(data.podnaslov || "");
            setDatum(data.datum ? new Date(data.datum).toISOString().slice(0, 16) : "");
            setLokacija(data.lokacija || "");
            setVsebina(data.vsebina || "");
            setProgramItems(Array.isArray(data.program) ? data.program : [{ skladatelj: "", naslov: "", stavki: [""] }]);
            setSkupine(Array.isArray(data.izvajalci) ? data.izvajalci : [{ imeSkupine: "", izvajalci: [{ ime: "", instrument: "" }] }]);
            setCikel(data.cikel || "mlada klasika");
            setEditingKoncertId(id);
        } catch (error) {
            console.error("Napaka pri nalaganju koncerta:", error);
        }
    };



    const [koncerti, setKoncerti] = useState([]);

    useEffect(() => {
        const fetchKoncerti = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setKoncerti(data);
                } else {
                    console.error("Pričakoval array, dobil:", data);
                    setKoncerti([]); // fallback na prazen array
                }
            } catch (error) {
                console.error("Napaka pri pridobivanju koncertov:", error);
                setKoncerti([]); // fallback na prazen array
            }
        };
        fetchKoncerti();
    }, []);


    function formatirajDatum(datum) {
        const meseci = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
        const date = new Date(datum);
        return `${date.getDate()}. ${meseci[date.getMonth()]} ob ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }



    return (
        <div>
            <div className="dodaj-koncert">
                <h2>Dodaj Koncert</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ime koncerta" value={ime} onChange={(e) => setIme(e.target.value)} required />
                    <input
                        type="text"
                        placeholder="Podnaslov"
                        value={podnaslov}
                        onChange={(e) => setPodnaslov(e.target.value)}
                    />

                    <input type="datetime-local" value={datum} onChange={(e) => setDatum(e.target.value)} required />
                    <textarea placeholder="Lokacija" value={lokacija} onChange={(e) => setLokacija(e.target.value)} required />
                    <textarea placeholder="Vsebina" value={vsebina} onChange={(e) => setVsebina(e.target.value)} required />
                    <div>
                        <h3>Program</h3>
                        {programItems.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Skladatelj"
                                    value={item.skladatelj}
                                    onChange={(e) => handleProgramChange(index, "skladatelj", e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Naslov"
                                    value={item.naslov}
                                    onChange={(e) => handleProgramChange(index, "naslov", e.target.value)}
                                    required
                                />
                                {item.stavki.map((stavek, stavekIdx) => (
                                    <div key={stavekIdx}>
                                        <input
                                            type="text"
                                            placeholder={`Stavek ${stavekIdx + 1}`}
                                            value={stavek}
                                            onChange={(e) => handleStavekChange(index, stavekIdx, e.target.value)}
                                        />
                                        <button
                                            className="odstrani"
                                            type="button"
                                            onClick={() => handleRemoveStavek(index, stavekIdx)}
                                        >
                                            Odstrani stavek
                                        </button>
                                    </div>
                                ))}
                                <button className="dodaj-gumb" type="button" onClick={() => addStavek(index)}>
                                    Dodaj stavek
                                </button>
                                <button
                                    className="odstrani"
                                    type="button"
                                    onClick={() => handleRemoveProgramItem(index)}
                                >
                                    Odstrani skladbo
                                </button>
                            </div>
                        ))}
                        <button className="dodaj-gumb" type="button" onClick={addProgramItem}>
                            Dodaj skladbo
                        </button>

                    </div>


                    {/* Dodajanje skupin z izvajalci */}
                    <h3>Izvajalci</h3>
                    <div>
                        {skupine.map((skupina, skupinaIndex) => (
                            <div key={skupinaIndex}>
                                <input
                                    type="text"
                                    placeholder="Ime skupine"
                                    value={skupina.imeSkupine}
                                    onChange={(e) => handleSkupinaChange(skupinaIndex, "imeSkupine", e.target.value)}
                                />
                                {skupina.izvajalci.map((izvajalec, izvajalecIndex) => (
                                    <div key={izvajalecIndex}>
                                        <input
                                            type="text"
                                            placeholder="Ime izvajalca"
                                            value={izvajalec.ime}
                                            onChange={(e) => handleIzvajalecChange(skupinaIndex, izvajalecIndex, "ime", e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Inštrument"
                                            value={izvajalec.instrument}
                                            onChange={(e) => handleIzvajalecChange(skupinaIndex, izvajalecIndex, "instrument", e.target.value)}
                                            required
                                        />
                                        <button className="odstrani" type="button" onClick={() => handleRemoveIzvajalec(skupinaIndex, izvajalecIndex)}>Odstrani izvajalca</button>
                                    </div>
                                ))}
                                <button className="dodaj-gumb" type="button" onClick={() => handleAddIzvajalec(skupinaIndex)}>Dodaj izvajalca</button>
                                <button className="odstrani" type="button" onClick={() => handleRemoveSkupina(skupinaIndex)}>Odstrani skupino</button>
                            </div>
                        ))}
                        <button className="dodaj-gumb" type="button" onClick={handleAddSkupina}>Dodaj skupino</button>
                    </div>

                    <select value={cikel} onChange={(e) => setCikel(e.target.value)}>
                        <option value="mlada klasika">Mlada Klasika</option>
                        <option value="mlada kreativa">Mlada Kreativa</option>
                        <option value="gostuje">Gostuje</option>
                        <option value="glasbaMladih">glasba mladih</option>
                    </select>

                    <input type="file" multiple onChange={handleSlikaChange} />
                    {seShranjuje && <h3 style={{ color: "green", fontWeight: "bold" }}>Evo se shranjuje :D...</h3>}
                    <button type="submit">Shrani koncert</button>
                </form>
            </div>


            <h1 className="center" style={{ marginTop: "1em" }}>Urejanje koncertov:</h1>
            <div className="spreminjanje-koncertov center">
                <div className="center">
                    {Array.isArray(koncerti) && koncerti.map((koncert) => (
                        <div key={koncert._id} className="spreminjanje-koncertov-karta">
                            <img className="dodajanje-slika" src={koncert.slike?.[0] || "/fallback.jpg"} alt={koncert.ime} />
                            <p><FaRegCalendarAlt style={{ marginRight: "10px" }} />{formatirajDatum(new Date(koncert.datum)).toLocaleString()}</p>
                            <h3><b>{koncert.ime}</b></h3>
                            <button type="button" onClick={() => naloziKoncertZaUrejanje(koncert._id)}>Uredi</button>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default DodajKoncerte;
