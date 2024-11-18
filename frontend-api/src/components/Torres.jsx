import { useState, useEffect } from "react";
import axios from "axios";

const Torres = () => {
    const [torres, setTorres] = useState([]);
    const [form, setForm] = useState({
        id: "",
        nombre: "",
        napto: "",
    });
    const [editingTorre, setEditingTorre] = useState(null); // Para manejar la torre que se está editando
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:3300/torres/torres";

    // Función para obtener torres
    const fetchTorres = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setTorres(response.data); // Asegúrate de que el backend devuelve un array de torres
        } catch (error) {
            setError("Error al obtener torres.");
            console.error("Error al obtener torres:", error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Manejar envío del formulario para crear o actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validar solo cuando se está editando
        if (!form.nombre || !form.napto || (editingTorre && !form.id)) {
            return setError("Todos los campos son obligatorios.");
        }

        try {
            if (editingTorre) {
                // Actualizar torre existente
                await axios.put(`${API_URL}`, form);  // Enviar la id, nombre y napto
                setEditingTorre(null); // Salir del modo edición
            } else {
                // Crear nueva torre (no requiere id)
                await axios.post(API_URL, form);
            }
            fetchTorres();
            setForm({ id: "", nombre: "", napto: "" }); // Limpiar formulario
        } catch (error) {
            setError(editingTorre ? "Error al actualizar torre." : "Error al guardar torre.");
            console.error("Error:", error);
        }
    };

    // Manejar eliminación de una torre
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTorres();
        } catch (error) {
            setError("No se puede eliminar una torre que incluye apartamentos");
            console.error("Error al eliminar torre:", error);
        }
    };

    // Iniciar edición de una torre
    const handleEdit = (torre) => {
        setEditingTorre(torre);
        setForm({ id: torre.id, nombre: torre.nombre, napto: torre.napto });
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        setEditingTorre(null);
        setForm({ id: "", nombre: "", napto: "" });
    };

    // Obtener torres cuando el componente se monte
    useEffect(() => {
        fetchTorres();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Gestión de Torres</h1>

            {/* Formulario */}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="text"
                    name="napto"
                    placeholder="Napto"
                    value={form.napto}
                    onChange={handleInputChange}
                    className="input"
                />
                {/* Campo oculto para la id */}
                {editingTorre && (
                    <input
                        type="hidden"
                        name="id"
                        value={form.id}
                    />
                )}
                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {editingTorre ? "Actualizar" : "Guardar"}
                    </button>
                    {editingTorre && (
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {/* Lista de torres */}
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <ul className="torres-list">
                    {torres.map((torre) => (
                        <li key={torre.id} className="torre-item">
                            <p><strong>ID:</strong> {torre.id}</p>
                            <p><strong>Nombre:</strong> {torre.nombre}</p>
                            <p><strong>Napto:</strong> {torre.napto}</p>
                            <div className="action-buttons">
                                <button className="delete-btn" onClick={() => handleDelete(torre.id)}>Eliminar</button>
                                <button className="edit-btn" onClick={() => handleEdit(torre)}>Actualizar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Torres;
