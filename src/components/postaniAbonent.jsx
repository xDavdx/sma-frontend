import React, { useState } from "react";
import axios from "axios";

const PostaniAbonent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const [privacyChecked, setPrivacyChecked] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!privacyChecked) {
            alert("Prosimo, da se strinjate s pravilnikom o zasebnosti.");
            return;
        }

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
                <div className="checkbox-wrapper" style={{ margin: "1em 0", fontSize: "0.95em", flexDirection: "column" }}>
                    <input
                        type="checkbox"
                        id="privacy"
                        checked={privacyChecked}
                        onChange={(e) => setPrivacyChecked(e.target.checked)}
                        required
                    />
                    <label htmlFor="privacy" style={{ marginLeft: "0.5em" }}>
                        Strinjam se s <a href="/pravilnik-zasebnosti" target="_blank" style={{ color: "#4C7F93" }}>pogoji zasebnosti</a>.
                    </label>
                </div>

                <button type="submit">Prijavi se</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PostaniAbonent;
