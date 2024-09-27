import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir si hay un token presente
    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/"); // Cambiado a navigate para redirigir correctamente
    }
  }, [store.token]); // Dependencia para volver a ejecutar el efecto si el token cambia

  return (
    <div className="text-center mt-5 w-50 mx-auto"> {/* Alineación centrada */}
      <h1>Login</h1>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            // Validación de entradas
            if (email === "" || password === "") {
              alert("Input cannot be empty");
            } else {
              actions.userLogin(email, password);
              navigate("/home");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
