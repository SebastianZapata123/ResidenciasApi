import { useState, useEffect } from "react";
import axios from "axios";
import './Tarifas.css'; // Asegúrate de importar el archivo CSS

const Tarifas = () => {
    const [tarifas, setTarifas] = useState([]);
    const [form, setForm] = useState({
        valor: "",
        descripcion: "",
        year: "",
        apartamentos_id: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:3300/tarifas/tarifas";

    // Función para obtener tarifas
    const fetchTarifas = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setTarifas(response.data);
        } catch (error) {
            setError("Error al obtener tarifas.");
            console.error("Error al obtener tarifas:", error);
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

        // Validación básica del formulario
        if (!form.valor || !form.descripcion || !form.year || !form.apartamentos_id) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            await axios.post(API_URL, form);
            fetchTarifas();
            setForm({ valor: "", descripcion: "", year: "", apartamentos_id: "" }); // Limpiar formulario
        } catch (error) {
            setError("Error al guardar tarifa.");
            console.error("Error al guardar tarifa:", error);
        }
    };

    // Manejar eliminación de una tarifa
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTarifas();
        } catch (error) {
            setError("Error al eliminar tarifa.");
            console.error("Error al eliminar tarifa:", error);
        }
    };

    // Obtener tarifas cuando el componente se monte
    useEffect(() => {
        fetchTarifas();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Gestión de Tarifas</h1>

            {/* Formulario */}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    value={form.valor}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="year"
                    placeholder="Año"
                    value={form.year}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="number"
                    name="apartamentos_id"
                    placeholder="Apartamento ID"
                    value={form.apartamentos_id}
                    onChange={handleInputChange}
                />
                <button type="submit" className="submit-btn">Guardar</button>
            </form>

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {/* Lista de tarifas */}
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <ul className="pagos-list">
                    {tarifas.map((tarifa) => (
                        <li key={tarifa.id} className="pago-item">
                            <p><strong>ID:</strong> {tarifa.id}</p>
                            <p><strong>Valor:</strong> {tarifa.valor}</p>
                            <p><strong>Año:</strong> {tarifa.year}</p>
                            <p><strong>Apartamento ID:</strong> {tarifa.apartamentos_id}</p>
                            <div className="action-buttons">
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn" onClick={() => handleDelete(tarifa.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tarifas;
