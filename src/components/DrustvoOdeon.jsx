import React from "react";

const DrustvoOdeon = () => {
    return (
        <div className="odeon-container">
            {/* Naslovna sekcija */}
            <section className="odeon-header">
                <h1>Društvo Odeon</h1>
                <h2>PROSTOR RAZVOJA IN UMETNOSTI</h2>
            </section>

            {/* Uvodni opis */}
            <section className="odeon-content">
                <p>
                    Kulturno društvo Odeon je bilo ustanovljeno z namenom ustvarjanja
                    priložnosti in umetniških projektov. Glavni cilj je promocija in
                    razvoj mladih glasbenikov in skladateljev. Delovalo bo kot
                    organizacijsko telo za vse projekte, v ospredju pa bosta koncertni
                    cikel Slovenski mladi abonma in iniciativa Glasba mladih.
                </p>
                <h1>Slika1</h1>
            </section>

            {/* Sekcija "Postani del ekipe" */}
            <section className="odeon-team">
                <h2>Postani del ekipe!</h2>
                <p>
                    Ekipa Slovenskega mladega abonmaja se širi! Iščemo mlade in zagnane
                    soorganizatorje, ki si želijo izkušenj in znanja na področju
                    organizacije glasbenih dogodkov, vodenja društva, promocije in še
                    več.
                </p>
                <p>
                    Vedno iščemo nove poglede in načine za promocijo in uveljavitev cikla,
                    vsaka ideja bo dobrodošla!
                </p>
                <h1>Slika2</h1>
            </section>

            {/* Sekcija "Kaj počnemo?" */}
            <section className="odeon-activities">
                <h2>Kaj počnemo?</h2>
                <p>
                    Vsi naši projekti so neprofitni in samoiniciativni. Trudimo se za
                    umetniški napredek mladih skladateljev in inštrumentalistov, za kar
                    potrebujemo sredstva. Zaenkrat smo večino sredstev dobili na državnih
                    in občinskih razpisih, iščemo pa tudi več možnosti za ustvarjanje
                    prihodka in finančno samostojnost.
                </p>

                <div className="odeon-columns">
                    {/* Leva kolona */}
                    <div className="odeon-column">
                        <h3>Sponzorstva</h3>
                        <p>
                            Radi bi sodelovali z drugimi ustanovami, podjetji in ljudmi, ki
                            našo vizijo razumejo in jo želijo tehtno uresničiti.
                        </p>
                        <h1>Slika3</h1>
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
            </section>

            {/* Sekcija "Nove ideje" */}
            <section className="odeon-ideas">
                <h2>Nove ideje</h2>
                <p>
                    Vedno iščemo nove in boljše načine za uveljavitev naših projektov,
                    ustvarjanje dohodka, promocijo naših umetnikov in drugo.
                </p>
                <h1>Slika4</h1>
            </section>

            {/* Kontaktna sekcija */}
            <section className="odeon-contact">
                <h2>KONTAKTIRAJ NAS!</h2>
            </section>
        </div>
    );
};

export default DrustvoOdeon;
