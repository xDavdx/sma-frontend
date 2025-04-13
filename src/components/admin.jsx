import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";



function Admin() {
    return (
        <div className="admin-container center">
            <div>
                <h1>Admin Nadzorna plošča</h1>
                <div className="admin-buttons">
                    <Link to="/admin/dodaj-koncerte">
                        <button className="admin-button"><IoIosAddCircleOutline />
                             Dodaj koncert</button>
                    </Link>
                    <Link to="/admin/dodaj-novice">
                        <button className="admin-button"><IoIosAddCircleOutline />
                             Dodaj novico</button>
                    </Link>
                    <Link to="/admin/pregled-rezervacij">
                        <button className="admin-button"><CiViewList />
                            Pregled rezervacij</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Admin;
