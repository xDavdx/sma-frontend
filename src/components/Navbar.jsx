import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = () => {
    return (
        <nav className={`navbar`}>
            <Link to="/" className="logo">

                <h1>Logo</h1>
            </Link>
            <ul className="nav-links">
                <li>
                    <Link to="/koncerti">Koncerti</Link>
                </li>
                <li>
                    <Link to="/drustvo-odeon">Društvo Odeon</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
