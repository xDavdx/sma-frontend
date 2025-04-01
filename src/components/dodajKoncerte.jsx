import { useState } from "react";

const DodajKoncerte = () => {
    const [ime, setIme] = useState("");
    const [datum, setDatum] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [program, setProgram] = useState("");
    const [izvajalci, setIzvajalci] = useState("");
    const [cikel, setCikel] = useState("mlada klasika");
    const [slika, setSlika] = useState(null); // Spremljaj slike

    const handleSlikaChange = (e) => {
        setSlika(e.target.files[0]); // Shranite izbrano sliko
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ime", ime);
        formData.append("datum", datum);
        formData.append("vsebina", vsebina);
        formData.append("program", program);
        formData.append("izvajalci", izvajalci);
        formData.append("cikel", cikel);

        // Če je slika, jo naloži v Cloudinary
        if (slika) {
            formData.append("file", slika);
        }

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
                <textarea
                    placeholder="Izvajalci"
                    value={izvajalci}
                    onChange={(e) => setIzvajalci(e.target.value)}
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
