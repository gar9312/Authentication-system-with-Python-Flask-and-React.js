import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);  // Nueva variable para manejar errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de entradas
    if (email === "" || password === "") {
      alert("Input cannot be empty");
      return;
    }

    // Llama a la acción signup del contexto
    try {
      const success = await actions.signup(email, password);  // Espera la respuesta
      if (success) {
        navigate("/home");  // Redirige solo si fue exitoso
      } else {
        setError("Signup failed. Please try again.");  // Muestra el mensaje de error
      }
    } catch (err) {
      setError("An error occurred during signup.");  // Manejo de errores de backend
    }
  };

  return (
    <div className="text-center mt-5 w-50 mx-auto">  {/* Ajusta el centrado */}
      <h1>Signup</h1>
      <div>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-danger mb-2">{error}</div>} {/* Muestra el mensaje de error */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
