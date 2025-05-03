import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";



function Admin() {
    return (
        <div className="admin-container center">
            <section className="razlozeni-cikli">
                <h1 className="arhiv-koncertov-naslov">
                    Admin nadzorna plošča
                </h1>

                <div className="admin-plosca">
                    <Link to="/admin/dodaj-koncerte">
                        <div className="admin-plosca-gumb center">
                            <h1 className="admin-plosca-ikona"><IoIosAddCircleOutline/></h1>
                            <h1 className="center">Dodaj/uredi koncert</h1>
                        </div>
                    </Link>

                    <Link to="/admin/dodaj-novice">
                        <div className="admin-plosca-gumb center">
                            <h1 className="admin-plosca-ikona"><IoIosAddCircleOutline/></h1>
                            <h1 className="center">Dodaj novico</h1>
                        </div>
                    </Link>

                    <Link to="/admin/pregled-rezervacij">
                        <div className="admin-plosca-gumb center">
                            <h1 className="admin-plosca-ikona"><CiViewList/></h1>
                            <h1 className="center">Pregled rezervacij</h1>
                        </div>
                    </Link>

                    <Link to="/admin/pregled-abonentov">
                        <div className="admin-plosca-gumb center">
                            <h1 className="admin-plosca-ikona"><CiViewList/></h1>
                            <h1 className="center">Abonenti</h1>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Admin;
