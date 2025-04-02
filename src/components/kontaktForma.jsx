import { useState } from "react";

function KontaktForma() {
    const [ime, setIme] = useState("");
    const [email, setEmail] = useState("");
    const [sporocilo, setSporocilo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ustvari mailto link
        const mailtoLink = `mailto:david.upwork.gg@gmail.com?subject=Novo sporočilo od ${encodeURIComponent(ime)}&body=${encodeURIComponent(sporocilo)}%0A%0AE-mail: ${encodeURIComponent(email)}`;

        // Odpri uporabnikov privzeti e-poštni odjemalec
        window.location.href = mailtoLink;
    };

    return (
        <div className="kontaktForma">
            <div className="center kontakt-forma-div">
                <h1>Pošlji sporočilo:</h1>
                <h3>z idejami za koncerte, možnosti za sodelovanja ali ponudbami se lahko javite preko obrazca</h3>
            </div>
            <form className="kontakt-forma" onSubmit={handleSubmit}>
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
                <textarea
                    placeholder="Vaše sporočilo"
                    value={sporocilo}
                    onChange={(e) => setSporocilo(e.target.value)}
                    required
                />
                <button type="submit">Pošlji</button>
                <p>*Obrazec bo poslal vnesene podatke na naš kontaktni naslov. Podatke potrebujemo, da vas lahko dodamo na mailing listo. Vaših podatkov ne posredujemo tretjim osebam. Če želite naknadni izbris vaših podatkov iz naše baze prejetih e-pošt, stopite v stik preko kontaktnih podatkov.</p>
            </form>
        </div>
    );
}

export default KontaktForma;
