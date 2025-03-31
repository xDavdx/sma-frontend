import React, { useState } from "react";
import axios from "axios";

const PostaniAbonent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Preveri, da pošiljaš na pravilno pot
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/abonent/dodaj`, { name, email });
            setMessage(response.data.message);
            setName("");
            setEmail("");
        } catch (error) {
            setMessage("Napaka pri prijavi!");
            console.error(error); // Poglej napako v konzoli za več podrobnosti
        }
    };

    return (
        <div className="abonent-section">
            <h2>Postani abonent</h2>
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
        </div>
    );
};

export default PostaniAbonent;
