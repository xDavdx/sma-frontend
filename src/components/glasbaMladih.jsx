import { Helmet } from "react-helmet";
import logo from "./smglasbamladih.png";
import {
    GiFlute,
    GiClarinet,
    GiHarp,
    GiSaxophone,
    GiGrandPiano,
    GiAccordion,
    GiViolin,
    GiTrumpet,
    GiBeerHorn, GiBassoon, GiTrombone, GiTelescopicBaton, GiMicrophone
} from "react-icons/gi";
import { LuDrum } from "react-icons/lu";
import { FaHouseUser } from "react-icons/fa";
import slika1 from "./placeholder.jpg"
import Galerija from "./Galerija";
import {Link} from "react-router-dom";
import React from "react";
import { gmSezone } from "./gmSezone";
import GmPlaceholder from "./gm-placeholder.png"
import GmSlika1 from "./gmSlika1.png"
import GmSlika2 from "./GmSlika2.png"
import GmSlika3 from "./GmSlika3.png"
import GmSlika4 from "./GmSlika4.png"
import GmSlika5 from "./GmSlika5.png"
import GmSlika6 from "./GmSlika6.png"







const ONas = () => {
    return (
        <div className="onas-container">
            <Helmet>
                <title>SMA - Glasba mladih</title>
                <meta name="description" content="S svojim trudom si želimo pomagati mladim slovenskim umetnikom, ki iščejo pot do profesionalne kariere" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {/* Sekcija: O nas */}
            <section className="onas-uvod">
                <div className="onas-uvod-container">
                    <div className="onas-uvod-left"></div>

                    <div className="onas-uvod-center">
                        <img src={logo} alt="logo" style={{ width: "18em" }} />
                    </div>

                    <div className="onas-uvod-right">
                        <a href="/o-nas">O nas</a>
                        <a href="/drustvo-odeon">Društvo Odeon</a>
                    </div>
                </div>
            </section>

            <section className="glasba-mladih-vsebina">
                <div className="glasba-mladih-iniciativa">
                    <div className="iniciativa-container">
                        <div className="iniciativa-image">
                            <img src={GmPlaceholder} alt="Iniciativa Glasba mladih" />
                        </div>
                        <div className="iniciativa-content">
                            <h1>Iniciativa Glasba mladih</h1>
                            <p>Glasba mladih je iniciativa, ki je nastala iz želje po izvajanju, pisanju in promoviranju novonastale vokalno-instrumentalne klasične glasbe mladih slovenskih skladateljev.</p>
                            <p>Prvo izvedbo je projekt doživel leta 2021 v Radovljici pod idejnim vodstvom Vida Ožbolta, kasneje pa je ideja prerasla v samostojen in celovit projekt, za katerega si želimo, da bi dolgo let bogatil slovensko kulturno zakladnico. Tako smo poleti leta 2022 izvedli nov koncert, kjer so se s še bolj zanimivo zasedbo predstavili še bolj raznoliki skladatelji; prvič nas je v živo snemala tudi RTV Slovenije, ki je koncert predvajala v dveh oddajah na programu Ars. Društvo slovenskih skladateljev je v lanski sezoni celo izdalo notno gradivo nekaterih skladb, tako da je dela naših sodelujočih umetnikov mogoče izvajati tudi zunaj projekta in prijateljskih krogov.</p>
                            <p>Od leta 2023 iniciativa še aktivneje deluje pod okriljem Kulturnega društva Odeon, ki je istega leta nastalo prav z namenom, da bo mladi generaciji služilo kot razvojno in organizacijsko telo. Dolgoročno želimo ustvariti tudi založbo, ki bo podpirala mlade umetnike in finančno omogočila izvajanje vseh projektov. Eden izmed večjih ciljev iniciative je z mladostniško energijo in sodobno pripravljenimi projekti v dvorane pripeljati čim več ljudi, ki klasične glasbe ne poznajo dobro, ali pa jo dojemajo celo kot zastarelo in nepomembno. Želimo jim pokazati, da imamo kljub mladosti že veliko za povedati, predvsem pa želimo s projekti spodbuditi razvoj slovenske klasične glasbe in omogočati raznolike priložnosti za uveljavljanje na glasbenem trgu. S tem počasi ustvarjamo pogoje za razcvet slovenske mlade umetnosti in sodobne klasične glasbe.</p>
                        </div>
                    </div>
                </div>




                <section className="arhiv-koncertov-container gm-sezone-glasba-mladih">
                    <h2 className="arhiv-koncertov-naslov">Pregled sezon</h2>

                    <div className="sezone-container">
                        {gmSezone.sort((a, b) => b.leto - a.leto).map((sezona) => (
                            <div key={sezona.leto} className="sezona-kartica">
                                <img
                                    src={sezona.logo}
                                    alt={sezona.ime}
                                    className="sezona-logo"
                                />
                                <h1>{sezona.ime}</h1>
                                <p>{sezona.naslov}</p>
                                <Link className="center" to={`/glasba-mladih/${sezona.leto}`}>
                                    <button className="koncert-gumb sezona-gumb-lala">
                                        Pregled sezone
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>






                <div className="center mt-4">
                    <div className="ansambel-glasba-mladih-tekst">
                        <h1 className="arhiv-koncertov-naslov">Ansambel Glasba mladih</h1>
                        <p>Iz projektov se je oblikoval projektni ansambel, ki združuje mlade slovenske glasbenike – instrumentaliste, pevce in dirigente. Vizija ansambla je, da bi skozi leta dosegel večjo samostojnost in se uveljavil na področju sodobne, kot tudi starejše klasične glasbe. </p>
                        <p>Osredotočamo se na vrhunsko uigranost ter natančno in predano izvedbo novih glasbenih del. Ansambel nima stalne oblike, temveč se prilagaja različnim projektom.
                        </p>
                        <img src={GmSlika3} alt="ansambel"/>
                    </div>
                </div>
                <div className="glasba-mladih-clani">
                    <h1 className="arhiv-koncertov-naslov" style={{ color: "white" }}>Člani ansambla:</h1>
                        <div className="glasba-mladih-vodje">
                            <div>
                                <h3><FaHouseUser style={{ marginRight: "8px" }}/>Umetniški vodja:</h3>
                                <ul>
                                    <li>Timotej Willewaldt</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiTelescopicBaton style={{ marginRight: "8px" }}/>Dirigenti:</h3>
                                <ul>
                                    <li>Lara Willewaldt</li>
                                    <li>Jakob Ivačič</li>
                                    <li>Vid Ožbolt</li>
                                </ul>
                            </div>
                        </div>
                        <div className="glasba-mmladih-clani-div">
                        <div>
                            <h3><GiFlute style={{ marginRight: "8px" }}/>Flavte:</h3>
                            <ul>
                                <li>Nuša Dolinšek</li>
                                <li>An Černe</li>
                                <li>Hana Žvagen</li>
                                <li>Ajda Mori</li>
                                <li>Maša Majcen</li>
                            </ul>
                        </div>
                            <div>
                                <h3><GiViolin style={{ marginRight: "8px" }}/>Violine:</h3>
                                <ul>
                                    <li>Laura de Wolff</li>
                                    <li>Maša Stopar</li>
                                    <li>Timotej Willewaldt</li>
                                    <li>Laura Bartelj</li>
                                    <li>Laura Calligaris</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiViolin style={{ marginRight: "8px" }}/>Viole:</h3>
                                <ul>
                                    <li>Patricija Malovrh Mlačnik</li>
                                    <li>Manca Kosmač</li>
                                    <li>Tjaša Klanac</li>
                                    <li>Izidora Krenn</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiViolin style={{ marginRight: "8px" }}/>Violončela:</h3>
                                <ul>
                                    <li>Sofia Grassi</li>
                                    <li>Ariel Vei Atanasovski</li>
                                    <li>Izak Hudnik</li>
                                    <li>Nuša Planinc</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiGrandPiano style={{ marginRight: "8px" }}/>Klavir:</h3>
                                <ul>
                                    <li>Neža Tovšak</li>
                                    <li>Vid Ibic</li>
                                    <li>Lara Oprešnik</li>
                                    <li>Eva Ostanek</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiMicrophone style={{ marginRight: "8px" }}/>Pevci:</h3>
                                <ul>
                                    <li>Adna Cinac (Sopran)</li>
                                    <li>Maja Triler (sopran)</li>
                                    <li>Tilen Udovič (bariton)</li>
                                    <li>Andraž Fink (bariton)</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiFlute style={{ marginRight: "8px" }}/>Oboe:</h3>
                                <ul>
                                    <li>Anamarija Vuga</li>
                                    <li>Tevž Kupljenik</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiClarinet style={{ marginRight: "8px" }}/>Klarineti:</h3>
                                <ul>
                                    <li>Luka Vovk</li>
                                    <li>Tadeja Malc</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiBassoon style={{ marginRight: "8px" }} />Fagot:</h3>
                                <ul>
                                    <li>Eva Fritz</li>
                                    <li>Rahela Češarek</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiBeerHorn style={{ marginRight: "8px" }} />Rogovi:</h3>
                                <ul>
                                    <li>David Tretjak</li>
                                    <li>Gašper Okorn</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiAccordion style={{ marginRight: "8px" }}/>Harmonika:</h3>
                                <ul>
                                    <li>Teja Udovič Kovačič</li>
                                    <li>Andraž Malgaj</li>
                                </ul>
                            </div>
                            <div>
                                <h3><LuDrum style={{ marginRight: "8px" }} />Tolkala:</h3>
                                <ul>
                                    <li>Tilen Zlatnar</li>
                                    <li>Radoš Bone</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiTrumpet style={{ marginRight: "8px" }} />Trobenta:</h3>
                                <ul>
                                    <li>Amadej Štrajhar</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiTrombone style={{ marginRight: "8px" }} />Pozavna:</h3>
                                <ul>
                                    <li>Kozjek</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiSaxophone style={{ marginRight: "8px" }}/>Saksofon:</h3>
                                <ul>
                                    <li>Lan Meden</li>
                                </ul>
                            </div>
                            <div>
                                <h3><GiHarp style={{ marginRight: "8px" }}/>Harfa:</h3>
                                <ul>
                                    <li>Sara Bajc</li>
                                </ul>
                            </div>

                            <div>
                                <h3><GiViolin style={{ marginRight: "8px" }}/>Kontrabas:</h3>
                                <ul>
                                    <li>Petja Pogačnik</li>
                                </ul>
                            </div>
                    </div>
                </div>
            </section>

            <section className="slike-grid-section">
                <img src={GmSlika1} alt=""/>
                <img src={GmSlika2} alt=""/>
                <img src={GmSlika3} alt=""/>
                <img src={GmSlika4} alt=""/>
                <img src={GmSlika5} alt=""/>
                <img src={GmSlika6} alt=""/>
            </section>

        </div>
    );
};

export default ONas;
