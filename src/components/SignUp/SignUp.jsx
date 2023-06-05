import styles from "./SignUp.module.css";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { InputControl } from "../Input/InputControl";

export function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const registro = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Llene todos los campos solicitados");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, { displayName: values.name });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Registro</h1>
        <InputControl
          label="Nombre: "
          placeholder="Ingrese un nombre"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Correo: "
          placeholder="Ingrese un correo"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password: "
          placeholder="Ingrese una contraseña"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={registro} disabled={submitButtonDisabled}>Registrar</button>
          <p>Si ya tienes cuenta
            <span>
                <Link to="/login"> inicia sesión</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
