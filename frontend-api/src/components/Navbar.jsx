import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <ul id="navbar">
                <li><Link to="/apartamentos">Apartamentos</Link></li>
                <li><Link to="/pagos">Pagos</Link></li>
                <li><Link to="/propietarios">Propietarios</Link></li>
                <li><Link to="/tarifas">Tarifas</Link></li>
                <li><Link to="/torres">Torres</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
