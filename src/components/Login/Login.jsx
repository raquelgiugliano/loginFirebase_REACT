import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { InputControl } from "../Input/InputControl";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const Login = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Datos Incompletos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
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
        <h1 className={styles.heading}>Login</h1>
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
          <button onClick={Login} disabled={submitButtonDisabled}>
            Iniciar Sesión
          </button>
          <p>¿No tienes cuenta?
          <span>
            <Link to="/signup">  crear</Link>
          </span>
          </p>
        </div>
      </div>
    </div>
  );
}
