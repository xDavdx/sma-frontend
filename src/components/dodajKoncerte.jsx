import { useState } from "react";

const DodajKoncerte = () => {
    const [ime, setIme] = useState("");
    const [datum, setDatum] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [program, setProgram] = useState("");
    const [cikel, setCikel] = useState("mlada klasika");
    const [slika, setSlika] = useState(null); // Spremljaj slike

    const handleSlikaChange = (e) => {
        setSlika(e.target.files[0]); // Shranite izbrano sliko
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ime", ime);
        formData.append("datum", datum);  // Preveri, da je datum v pravilnem formatu
        formData.append("vsebina", vsebina);
        formData.append("program", program);
        formData.append("cikel", cikel);

        if (slika) {
            formData.append("slika", slika);  // Dodaj sliko, če je izbrana
        }

        try {
            const response = await fetch("http://localhost:5001/koncerti/dodaj", {
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
        }
    };

    return (
        <div className="dodaj-koncert">
            <h2>Dodaj Koncert</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ime"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Vsebina"
                    value={vsebina}
                    onChange={(e) => setVsebina(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    required
                />
                <select value={cikel} onChange={(e) => setCikel(e.target.value)}>
                    <option value="mlada klasika">Mlada Klasika</option>
                    <option value="mlada kreativa">Mlada Kreativa</option>
                    <option value="abonma">Abonma</option>
                    <option value="gostuje">Gostuje</option>
                </select>

                <input
                    type="file"
                    onChange={handleSlikaChange}  // Spremljanje slike
                />

                <button type="submit">Shrani koncert</button>
            </form>
        </div>
    );
};

export default DodajKoncerte;
