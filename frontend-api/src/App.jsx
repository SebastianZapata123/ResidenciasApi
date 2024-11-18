import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Apartamentos from "./components/Apartamentos";
import Pagos from "./components/Pagos";
import Propietarios from "./components/Propietarios";
import Tarifas from "./components/Tarifas";
import Torres from "./components/Torres";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/apartamentos" element={<Apartamentos />} />
                <Route path="/pagos" element={<Pagos />} />
                <Route path="/propietarios" element={<Propietarios />} />
                <Route path="/tarifas" element={<Tarifas />} />
                <Route path="/torres" element={<Torres />} />
            </Routes>
        </Router>
    );
};

export default App;
