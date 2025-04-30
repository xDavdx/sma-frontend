import React from "react";
import logo from "./odeon-logo.png";
import onasSlika from "./placeholder.jpg";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

const DrustvoOdeon = () => {
    return (
        <div className="odeon-container">
            {/* Naslovna sekcija */}
            <section className="onas-uvod">
                <div className="onas-uvod-container">
                    <div className="onas-uvod-left"></div>

                    <div className="onas-uvod-center">
                        <img src={logo} alt="logo" style={{ width: "25em" }} />
                    </div>

                    <div className="onas-uvod-right">
                        <a href="/o-nas">O nas</a>
                        <a href="/glasba-mladih">Glasba mladih</a>
                    </div>
                </div>
            </section>

            {/* Uvodni opis */}
            <div className="center">
                <Helmet>
                    <title>SMA - Odeon</title>
                    <meta name="description" content="Kulturno društvo Odeon je bilo ustanovljeno z namenom ustvarjanja
                        priložnosti in umetniških projektov. Glavni cilj je promocija in
                        razvoj mladih glasbenikov in skladateljev." />
                </Helmet>
                <section className="odeon-content">
                    <h1>O društvu</h1>
                    <p>
                        Kulturno društvo Odeon je bilo ustanovljeno z namenom ustvarjanja
                        priložnosti in umetniških projektov. Glavni cilj je promocija in
                        razvoj mladih glasbenikov in skladateljev. Delovalo bo kot
                        organizacijsko telo za vse projekte, v ospredju pa bosta koncertni
                        cikel Slovenski mladi abonma in iniciativa Glasba mladih.
                    </p>
                    <p>Želiš postati član društva in uresničiti našo vizijo? <Link to="/#kontakt" style={{ color: "#4C7F93" }}>Postani član</Link> </p>

                    <div className="onas-uvod-header-desno">
                        <img src={onasSlika} alt="Kulturno društvo Odeon"/>
                        <p>
                            <strong>Kaj počnemo?</strong><br/>
                            Vsi naši projekti so neprofitni in samoiniciativni. Trudimo se za umetniški napredek mladih
                            skladateljev in inštrumentalistov, za kar potrebujemo sredstva. Zaenkrat smo večino sredstev
                            dobili na državnih in občinskih razpisih, iščemo pa tudi več možnosti za ustvarjanje prihodka
                            in finančno samostojnost.
                        </p>
                    </div>
                </section>
            </div>


            {/* Sekcija "Kaj počnemo?" */}
            <section className="odeon-activities">
                <div className="odeon-columns">
                    {/* Leva kolona */}
                    <div className="odeon-column">
                        <h3>Sponzorstva</h3>
                        <p>
                            Radi bi sodelovali z drugimi ustanovami, podjetji in ljudmi, ki
                            našo vizijo razumejo in jo želijo tehtno uresničiti.
                        </p>
                    </div>

                    {/* Desna kolona */}
                    <div className="odeon-column">
                        <h3>Promocija</h3>
                        <p>
                            Trudimo se za kreativno in zanimivo oglaševanje, za kar je
                            pomembna vizualna podoba in vsebinska pristnost cikla.
                        </p>
                    </div>

                </div>
                <div className="podpiraj-dejavnost">
                    <h3>Želite podpirati naše dejavnosti? <Link to="/#kontakt" style={{ color: "#B9D9EA" }}>Kontaktirajte nas!</Link> </h3>
                </div>
            </section>


        </div>
    );
};

export default DrustvoOdeon;
