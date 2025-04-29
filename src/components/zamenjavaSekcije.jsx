import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import slika1 from "./placeholder.jpg";

const SekcijskiZamenjevalnik = () => {
    const [trenutniIndex, setTrenutniIndex] = useState(0);

    const sekcije = [
        {
            id: 0,
            naslov: "Glasba mladih",
            opis: (
                <>
                    <p>Glasba mladih je iniciativa, ki je nastala iz želje po izvajanju, pisanju in promoviranju novonastale vokalno-instrumentalne klasične glasbe mladih slovenskih skladateljev.</p>
                    <p>Prvo izvedbo je projekt doživel leta 2021 v Radovljici pod idejnim vodstvom Vida Ožbolta, kasneje pa je ideja prerasla v samostojen in celovit projekt.</p>
                </>
            ),
            gumb: (
                <Link to="/glasba-mladih">
                    <button className="koncert-gumb">Več o glasbi mladih</button>
                </Link>
            ),
        },
        {
            id: 1,
            naslov: "Društvo Odeon",
            opis: (
                <>
                    <p>Kulturno društvo Odeon je bilo ustanovljeno z namenom ustvarjanja priložnosti in umetniških projektov.</p>
                    <p>Delovalo bo kot organizacijsko telo za vse projekte, v ospredju pa bosta koncertni cikel Slovenski mladi abonma in iniciativa Glasba mladih.</p>
                </>
            ),
            gumb: (
                <Link to="/drustvo-odeon">
                    <button className="koncert-gumb">Več o društvu</button>
                </Link>
            ),
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTrenutniIndex((prevIndex) => (prevIndex + 1) % sekcije.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section>
            <div className="glasba-mladih-iniciativa">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={trenutniIndex}
                        className="iniciativa-container"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div className="iniciativa-image">
                            <img src={slika1} alt={sekcije[trenutniIndex].naslov} />
                        </div>
                        <div className="iniciativa-content">
                            <h1 style={{ color: "black" }}>{sekcije[trenutniIndex].naslov}</h1>
                            {sekcije[trenutniIndex].opis}
                            {sekcije[trenutniIndex].gumb}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="zamenjevalnik-pike">
                    {sekcije.map((_, index) => (
                        <span
                            key={index}
                            className={`pika ${index === trenutniIndex ? "aktivna" : ""}`}
                            onClick={() => setTrenutniIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SekcijskiZamenjevalnik;
