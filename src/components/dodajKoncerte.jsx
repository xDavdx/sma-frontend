import { useState } from "react";

const DodajKoncerte = () => {
    const [ime, setIme] = useState("");
    const [datum, setDatum] = useState("");
    const [vsebina, setVsebina] = useState("");
    const [program, setProgram] = useState("");
    const [izvajalci, setIzvajalci] = useState("");
    const [cikel, setCikel] = useState("mlada klasika");
    const [slike, setSlike] = useState([]); // Shranimo array izbranih slik

    const handleSlikaChange = (e) => {
        setSlike([...e.target.files]); // Shrani vse izbrane slike v array
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

        // Dodamo vse slike v formData
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
        }
    };

    return (
        <div>
            <div className="dodaj-koncert">
                <h2>Dodaj Koncert</h2>
                <div className="legend-container">
                    <h3 className="legend-title">Legenda za dodajanje :)</h3>
                    <ol className="legend-list">
                        <li className="legend-text">
                            <ul> <br/>
                                <li>
                                    Pri programu: vse skladbe ločiš z <b className="highlight">podčrtajem (;)</b> in skladbo od avtorja z <b className="highlight">vejico (,)</b>
                                </li>
                                <li>
                                    Primer: <i className="example-text">Der Musikant<b className="highlight">,</b> Joseph von Eichendorff<b className="highlight">;</b> Fußreise<b className="highlight">,</b> Eduard Mörike<b className="highlight">;</b> ...</i>
                                </li>
                            </ul>
                        </li>
                        <li className="legend-text">
                            <ul> <br/>
                                <li>
                                    Pri izvajalcih: imena izvajalcev ločiš z <b className="highlight">vejico (,)</b>
                                </li>
                                <li>
                                    Primer: <i className="example-text">Timotej Willewaldt<b className="highlight">,</b> Janez Novak<b className="highlight">,</b> ...</i>
                                </li>
                            </ul>
                        </li>
                        <li className="legend-text">
                            <ul> <br/>
                                <li>
                                    Pri slikah: Dodaš lahko <b className="highlight">do 10 slik</b>, v formatih <b className="highlight">JPG, JPEG, PNG</b>
                                </li>
                            </ul>
                            </li>
                    </ol>
                </div>



                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} required />
                    <input type="datetime-local" value={datum} onChange={(e) => setDatum(e.target.value)} required />
                    <textarea placeholder="Vsebina" value={vsebina} onChange={(e) => setVsebina(e.target.value)} required />
                    <textarea placeholder="Program (upoštevaj ločitve!!)" value={program} onChange={(e) => setProgram(e.target.value)} required />
                    <textarea placeholder="Izvajalci (upoštevaj ločitve!!)" value={izvajalci} onChange={(e) => setIzvajalci(e.target.value)} required />

                    <select value={cikel} onChange={(e) => setCikel(e.target.value)}>
                        <option value="mlada klasika">Mlada Klasika</option>
                        <option value="mlada kreativa">Mlada Kreativa</option>
                        <option value="abonma">Abonma</option>
                        <option value="gostuje">Gostuje</option>
                    </select>

                    {/* Omogočimo izbiro več slik */}
                    <input type="file" multiple onChange={handleSlikaChange} />

                    <button type="submit">Shrani koncert</button>
                </form>
            </div>
        </div>
    );
};

export default DodajKoncerte;
