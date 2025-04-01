import React, { useState } from "react";
import axios from "axios";

const PostaniAbonent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/abonent/dodaj`, { name, email });
            setMessage(response.data.message);
            setName("");
            setEmail("");
        } catch (error) {
            setMessage("Napaka pri prijavi!");
            console.error(error);
        }
    };

    return (
        <div className="abonent-section">
            <h2>Postani abonent</h2>
            <p className="abonent-section-p">Za prejem novic in povabil na koncerte</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ime in priimek"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail naslov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Prijavi se</button>
            </form>
            {message && <p>{message}</p>}
            <p>*Obrazec bo poslal vnesene podatke na naš kontaktni naslov. Podatke potrebujemo, da vas lahko dodamo na mailing listo. Vaših podatkov ne posredujemo tretjim osebam. Če želite naknadni izbris vaših podatkov iz naše baze prejetih e-pošt, stopite v stik preko kontaktnih podatkov.

            </p>
        </div>
    );
};

export default PostaniAbonent;
