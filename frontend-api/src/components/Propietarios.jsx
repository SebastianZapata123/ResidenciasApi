import { useState, useEffect } from "react";
import axios from "axios";
import './Propietarios.css'; // Asegúrate de importar el archivo CSS

const Propietarios = () => {
    const [propietarios, setPropietarios] = useState([]);
    const [form, setForm] = useState({
        id: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
        direccion: "",
    });
    const [editingPropietario, setEditingPropietario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:3300/propietarios/cliente";

    const fetchPropietarios = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setPropietarios(response.data);
        } catch (error) {
            setError("Error al obtener propietarios.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.nombres || !form.apellidos || !form.telefono || !form.email || !form.direccion) {
            return setError("Todos los campos son obligatorios.");
        }

        try {
            if (editingPropietario) {
                await axios.put(`${API_URL}`, form, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                setEditingPropietario(null);
            } else {
                await axios.post(API_URL, form, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            }
            fetchPropietarios();
            setForm({ nombres: "", apellidos: "", telefono: "", email: "", direccion: "", id: "" });
        } catch (error) {
            setError(editingPropietario ? "Error al actualizar propietario." : "Error al guardar propietario.");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPropietarios();
        } catch (error) {
            setError("No se puede eliminar un propietario vinculado a un apartamento.");
            console.error("Error:", error);
        }
    };

    const handleEdit = (propietario) => {
        setEditingPropietario(propietario);
        setForm({
            id: propietario.id,
            nombres: propietario.nombres,
            apellidos: propietario.apellidos,
            telefono: propietario.telefono,
            email: propietario.email,
            direccion: propietario.direccion,
        });
    };

    const handleCancelEdit = () => {
        setEditingPropietario(null);
        setForm({ nombres: "", apellidos: "", telefono: "", email: "", direccion: "", id: "" });
    };

    useEffect(() => {
        fetchPropietarios();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Gestión de Propietarios</h1>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleInputChange}
                    className="input"
                />
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">{editingPropietario ? "Actualizar" : "Guardar"}</button>
                    {editingPropietario && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="btn cancel-btn"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <ul className="propietarios-list">
                    {propietarios.map((propietario) => (
                        <li key={propietario.id} className="propietario-item">
                            <p><strong>ID:</strong> {propietario.id}</p>
                            <p><strong>Nombres:</strong> {propietario.nombres}</p>
                            <p><strong>Apellidos:</strong> {propietario.apellidos}</p>
                            <p><strong>Teléfono:</strong> {propietario.telefono}</p>
                            <p><strong>Email:</strong> {propietario.email}</p>
                            <p><strong>Dirección:</strong> {propietario.direccion}</p>
                            <div className="action-buttons">
                                <button
                                    onClick={() => handleDelete(propietario.id)}
                                    className="btn delete-btn"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => handleEdit(propietario)}
                                    className="btn edit-btn"
                                >
                                    Editar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Propietarios;
    