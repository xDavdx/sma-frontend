import React, { useState } from "react";

const Galerija = ({ slike }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const slikeNaStran = 4;

    const prikazaneSlike = slike.slice(startIndex, startIndex + slikeNaStran);

    const naprej = () => {
        if (startIndex + slikeNaStran < slike.length) {
            setStartIndex(startIndex + slikeNaStran);
        }
    };

    const nazaj = () => {
        if (startIndex - slikeNaStran >= 0) {
            setStartIndex(startIndex - slikeNaStran);
        }
    };

    const zapriModal = () => setSelectedIndex(null);

    const naslednja = () => {
        if (selectedIndex !== null && selectedIndex < slike.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const prejsnja = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    return (
        <div className="galerija-container">
            <div className="galerija-grid">
                {prikazaneSlike.map((slika, i) => (
                    <img
                        key={i}
                        src={slika}
                        alt={`Galerija ${i}`}
                        className="galerija-slika"
                        onClick={() => setSelectedIndex(startIndex + i)}
                    />
                ))}
            </div>

            <div className="galerija-gumbi">
                <button onClick={nazaj} disabled={startIndex === 0}>←</button>
                <button onClick={naprej} disabled={startIndex + slikeNaStran >= slike.length}>→</button>
            </div>

            {selectedIndex !== null && (
                <div className="modal-overlay" onClick={zapriModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-prev" onClick={prejsnja} disabled={selectedIndex === 0}>←</button>
                        <img src={slike[selectedIndex]} alt="Povečana slika" />
                        <button className="modal-next" onClick={naslednja} disabled={selectedIndex === slike.length - 1}>→</button>
                        <button className="modal-close" onClick={zapriModal}>✕</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Galerija;
