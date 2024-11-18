import { useState, useEffect } from "react";
import axios from "axios";
import './Pagos.css';  // Importa el archivo CSS

const Pagos = () => {
    const [pagos, setPagos] = useState([]);
    const [form, setForm] = useState({
        monto: "",
        fecha: "",
        descripcion: "",
        apartamentos_id: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:3300/apartapagos/pagos";

    // Función para obtener pagos
    const fetchPagos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setPagos(response.data);
        } catch (error) {
            setError("Error al obtener pagos.");
            console.error("Error al obtener pagos:", error);
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
            // Obtener el año, mes y día de la fecha seleccionada
            const fecha = new Date(form.fecha);
            const year = fecha.getFullYear();
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos
            const dia = fecha.getDate().toString().padStart(2, '0'); // Día con 2 dígitos
    
            // Formatear la fecha a YYYY-MM-DD
            const fechaFormateada = `${year}-${mes}-${dia}`;
    
            const payload = {
                year: year,
                mes: mes,
                fecha: fechaFormateada, // Enviar la fecha formateada
                valor: form.monto,
                descripcion: form.descripcion,
                apartamentos_id: form.apartamentos_id,
            };
    
            await axios.post(API_URL, payload);
            fetchPagos();
            setForm({ monto: "", fecha: "", descripcion: "", apartamentos_id: "" }); // Limpiar formulario
        } catch (error) {
            setError("Error al guardar pago.");
            console.error("Error al guardar pago:", error);
        }
    };
    

    // Manejar eliminación de un pago
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPagos();
        } catch (error) {
            setError("Error al eliminar pago.");
            console.error("Error al eliminar pago:", error);
        }
    };

    // Obtener pagos cuando el componente se monte
    useEffect(() => {
        fetchPagos();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Gestión de Pagos</h1>
            
            {/* Formulario */}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="number"
                    name="monto"
                    placeholder="Monto"
                    value={form.monto}
                    onChange={handleInputChange}
                />
                <input
                    className="input"
                    type="date"
                    name="fecha"
                    placeholder="Fecha (año/mes/día)"
                    value={form.fecha}
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
                    name="apartamentos_id"
                    placeholder="ID de Apartamento"
                    value={form.apartamentos_id}
                    onChange={handleInputChange}
                />
                <div className="form-actions">
                    <button className="btn submit-btn" type="submit">Guardar</button>
                </div>
            </form>

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {/* Lista de pagos */}
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <ul className="pagos-list">
                    {pagos.map((pago) => {
                        const fecha = new Date(pago.fecha);
                        const año = fecha.getFullYear();
                        const mes = fecha.getMonth() + 1;
                        const dia = fecha.getDate();
                        const fechaFormateada = `${año}/${mes < 10 ? `0${mes}` : mes}/${dia < 10 ? `0${dia}` : dia}`;

                        return (
                            <li key={pago.id} className="pago-item">
                                <p><strong>Fecha:</strong> {fechaFormateada}</p>
                                <p><strong>Valor:</strong> ${pago.valor}</p>
                                <p><strong>Descripción:</strong> {pago.descripcion}</p>
                                <p><strong>ID del Apartamento:</strong> {pago.apartamentos_id}</p>
                                <div className="action-buttons">
                                    <button className="btn delete-btn" onClick={() => handleDelete(pago.id)}>Eliminar</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Pagos;
