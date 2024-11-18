import { useState, useEffect } from "react";
import axios from "axios";
import './Apartamentos.css';  // Importa el archivo CSS

const Apartamentos = () => {
    const [apartamentos, setApartamentos] = useState([]);
    const [form, setForm] = useState({
        numero: "",
        habitaciones: "",
        bathroom: "",
        area: "",
        torres_id: "",
        propietarios_id: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:3300/apartamentos/apartamentos";

    // Función para obtener apartamentos
    const fetchApartamentos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setApartamentos(response.data);
        } catch (error) {
            setError("Error al obtener apartamentos.");
            console.error("Error al obtener apartamentos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Limpiar mensaje de error previo
        try {
            await axios.post(API_URL, form);
            fetchApartamentos();
            setForm({ numero: "", habitaciones: "", bathroom: "", area: "", torres_id: "", propietarios_id: "" }); // Limpiar formulario
        } catch (error) {
            setError("Error al guardar apartamento.");
            console.error("Error al guardar apartamento:", error);
        }
    };

    // Manejar eliminación de un apartamento
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchApartamentos();
        } catch (error) {
            setError("Error al eliminar apartamento.");
            console.error("Error al eliminar apartamento:", error);
        }
    };

    // Obtener apartamentos cuando el componente se monte
    useEffect(() => {
        fetchApartamentos();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Gestión de Apartamentos</h1>
            
            {/* Formulario */}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    name="numero"
                    placeholder="Número"
                    value={form.numero}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="habitaciones"
                    placeholder="Habitaciones"
                    value={form.habitaciones}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="bathroom"
                    placeholder="Baños"
                    value={form.bathroom}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="area"
                    placeholder="Área (m²)"
                    value={form.area}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="torres_id"
                    placeholder="ID de la Torre"
                    value={form.torres_id}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="propietarios_id"
                    placeholder="ID del Propietario"
                    value={form.propietarios_id}
                    onChange={handleInputChange}
                />
                <div className="form-actions">
                    <button className="btn submit-btn" type="submit">Guardar</button>
                </div>
            </form>

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {/* Lista de apartamentos */}
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <ul className="apartamentos-list">
                    {apartamentos.map((apto) => (
                        <li key={apto.id} className="apartamento-item">
                             <p><strong>ID:</strong> {apto.id}</p>
                            <p><strong>Número:</strong> {apto.numero}</p>
                            <p><strong>Habitaciones:</strong> {apto.habitaciones}</p>
                            <p><strong>Baños:</strong> {apto.bathroom}</p>
                            <p><strong>Área:</strong> {apto.area} m²</p>
                            <p><strong>ID de la Torre:</strong> {apto.torres_id}</p>
                            <p><strong>ID del Propietario:</strong> {apto.propietarios_id}</p>
                            <div className="action-buttons">
                                <button className="btn delete-btn" onClick={() => handleDelete(apto.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Apartamentos;
