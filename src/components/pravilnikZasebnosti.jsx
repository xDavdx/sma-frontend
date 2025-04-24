import React from "react";
import {MdOutlineMailOutline} from "react-icons/md";
import logo from "./sma-logo-font.png";

const ONas = () => {
    return (
        <div>
            <section className="onas-uvod center">
                <div className="onas-uvod-header-levo">
                    <h2>Pogoji zasebnosti</h2>
                    <p>Vaša zasebnost nam je pomembna. Ta pravilnik o zasebnosti pojasnjuje, katere osebne podatke zbiramo, kako jih uporabljamo in kako jih varujemo.</p>
                </div>
            </section>
            <div className="pravilnik-zasebnosti pravilnik-container">

            <h3>Člen 1: Zbiranje osebnih podatkov</h3>
            <p>Zbiramo naslednje osebne podatke, ki jih uporabnik prostovoljno vnese prek spletnega obrazca:</p>
            <ul>
                <li>Ime</li>
                <li>Priimek</li>
                <li>Elektronski naslov (e-mail)</li>
            </ul>

            <h3>Člen 2: Namen zbiranja</h3>
            <p>Zbrane podatke uporabljamo izključno za naslednje namene:</p>
            <ul>
                <li>Rezervacija kart za koncerte</li>
                <li>Pošiljanje e-novic o prihajajočih koncertih in dogodkih</li>
            </ul>
            <p>Podatkov ne delimo z nobeno tretjo osebo.</p>

            <h3>Člen 3: Hramba podatkov</h3>
            <p>Podatke hranimo v varovani podatkovni bazi (MongoDB), do katere imajo dostop le pooblaščene osebe. Podatki se hranijo:</p>
            <ul>
                <li>Dokler uporabnik ne zahteva izbrisa</li>
                <li>Ali dokler podatki niso več potrebni za zgoraj navedene namene</li>
            </ul>

            <h3>Člen 4: Pravice uporabnikov</h3>
            <p>V skladu z Uredbo GDPR imate naslednje pravice:</p>
            <ul>
                <li>Pravica do vpogleda v svoje podatke</li>
                <li>Pravica do popravka svojih podatkov</li>
                <li>Pravica do izbrisa podatkov ("pravica do pozabe")</li>
            </ul>
            <p>Za uveljavljanje teh pravic nas kontaktirajte na: <a href="mailto:mladi.abonma@gmail.com"><MdOutlineMailOutline /> mladi.abonma@gmail.com</a></p>

            <h3>Člen 5: Soglasje</h3>
            <p>Z uporabo naših obrazcev soglašate z obdelavo svojih osebnih podatkov v skladu s tem pravilnikom o zasebnosti.</p>


        </div>
        </div>
    );
};

export default ONas;
