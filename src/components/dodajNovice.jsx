import { useState } from "react";

const DodajNovice = () => {
    const [ime, setIme] = useState("");
    const [podnaslov, setPodnaslov] = useState("");
    const [datum, setDatum] = useState("");
    const [slike, setSlike] = useState([]);
    const [sekcije, setSekcije] = useState([{ datum: "", podpodnaslov: "", vsebina: "" }]);
    const [seShranjuje, setSeShranjuje] = useState(false);

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

        slike.forEach(slika => {
            formData.append("slike", slika);
        });

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/novice/dodaj`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("✅ Novica uspešno dodana!");
                setIme(""); setPodnaslov(""); setDatum("");
                setSlike([]);
                setSekcije([{ datum: "", podpodnaslov: "", vsebina: "" }]);
            } else {
                const err = await res.json();
                alert("Napaka: " + err.message);
            }
        } catch (err) {
            console.error("Napaka:", err);
            alert("Napaka pri pošiljanju podatkov.");
        } finally {
            setSeShranjuje(false);
        }
    };

    return (
        <div className="dodaj-koncert">
            <h2>Dodaj Novico</h2>
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
                <button type="submit">Shrani Novico</button>
            </form>
        </div>
    );
};

export default DodajNovice;
