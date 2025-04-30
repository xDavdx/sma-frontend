import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import LogoKlasika from "./smklasik.png";
import LogoGlasbaM from "./smglasbamladih.png";
import LogoKreativa from "./smkreativ.png";
import LogoGostuje from "./smagost.png";



function Admin() {
    return (
        <div className="admin-container center">
            <section className="razlozeni-cikli">
                <h1 className="arhiv-koncertov-naslov">
                    Admin nadzorna plošča
                </h1>

                <div className="razlozeni-cikli-wrapper">
                    <Link to="/admin/dodaj-koncerte">
                        <div className="razlozeni-cikli-kartica">
                            <h1 className="ikone-admin-dodajanje"><IoIosAddCircleOutline /></h1>
                            <h1>Dodaj/uredi koncert</h1>
                        </div>
                    </Link>

                    <Link to="/admin/dodaj-novice">
                        <div className="razlozeni-cikli-kartica">
                            <h1 className="ikone-admin-dodajanje"><IoIosAddCircleOutline /></h1>
                            <h1>Dodaj novico</h1>
                        </div>
                    </Link>

                    <Link to="/admin/pregled-rezervacij">
                        <div className="razlozeni-cikli-kartica">
                            <h1 className="ikone-admin-dodajanje"><CiViewList /></h1>
                            <h1>Pregled rezervacij</h1>
                        </div>
                    </Link>

                    <Link to="/admin/pregled-abonentov">
                        <div className="razlozeni-cikli-kartica">
                            <h1 className="ikone-admin-dodajanje"><CiViewList /></h1>
                            <h1>Abonenti</h1>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Admin;
