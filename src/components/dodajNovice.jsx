import { useState } from "react";

const DodajNovice = () => {
    const [ime, setIme] = useState("");
    const [podnaslov, setPodnaslov] = useState("");
    const [datum, setDatum] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [slike, setSlike] = useState([]);
    const [seShranjuje, setSeShranjuje] = useState(false);

    const handleSlikeChange = (e) => {
        setSlike([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSeShranjuje(true);

        const formData = new FormData();
        formData.append("ime", ime);
        formData.append("podnaslov", podnaslov);
        formData.append("datum", datum);
        formData.append("vsebina", vsebina);

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
                setIme(""); setPodnaslov(""); setDatum(""); setVsebina(""); setSlike([]);
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
                <textarea placeholder="Vsebina" value={vsebina} onChange={(e) => setVsebina(e.target.value)} required />
                <input type="file" multiple onChange={handleSlikeChange} />
                {seShranjuje && <p style={{ color: "green" }}>Evo se shranjuje :D ..</p>}
                <button type="submit">Shrani Novico</button>
            </form>
        </div>
    );
};

export default DodajNovice;
