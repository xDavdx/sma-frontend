import { useState } from "react";

const DodajKoncerte = () => {
    const [ime, setIme] = useState("");
    const [datum, setDatum] = useState("");
    const [lokacija, setLokacija] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [program, setProgram] = useState("");
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
        formData.append("datum", datum);
        formData.append("lokacija", lokacija);
        formData.append("vsebina", vsebina);
        formData.append("program", program);
        formData.append("cikel", cikel);

        // Poslano bo kot seznam skupin z izvajalci
        formData.append("izvajalci", JSON.stringify(skupine));

        slike.forEach((slika) => {
            formData.append("slike", slika);
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/koncerti/dodaj`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Koncert uspešno dodan!");
            } else {
                const errorResponse = await response.json();
                alert("Napaka pri dodajanju koncerta: " + errorResponse.message);
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

    return (
        <div>
            <div className="dodaj-koncert">
                <h2>Dodaj Koncert</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} required />
                    <input type="datetime-local" value={datum} onChange={(e) => setDatum(e.target.value)} required />
                    <textarea placeholder="Lokacija" value={lokacija} onChange={(e) => setLokacija(e.target.value)} required />
                    <textarea placeholder="Vsebina" value={vsebina} onChange={(e) => setVsebina(e.target.value)} required />
                    <textarea placeholder="Program (upoštevaj ločitve!!)" value={program} onChange={(e) => setProgram(e.target.value)} required />

                    {/* Dodajanje skupin z izvajalci */}
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
                        <option value="abonma">Abonma</option>
                        <option value="gostuje">Gostuje</option>
                    </select>

                    <input type="file" multiple onChange={handleSlikaChange} />
                    {seShranjuje && <h3 style={{ color: "green", fontWeight: "bold" }}>Evo se shranjuje :D...</h3>}
                    <button type="submit">Shrani koncert</button>
                </form>
            </div>
        </div>
    );
};

export default DodajKoncerte;
