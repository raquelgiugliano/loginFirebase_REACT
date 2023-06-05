import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "./Home.module.css";

function salir() {
  return auth.signOut();
  navigate("/");
}

export function Home(props) {
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div>
          <h1>
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              to="/login"
            >
              Iniciar Sesión
            </Link>
          </h1>
          <br />
          <h1>
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              to="/signup"
            >
              Registrar Cuenta
            </Link>
          </h1>
        </div>
        <h2>
          {props.name
            ? `Bienvenido - ${props.name}`
            : "Debe iniciar sesión o registrar cuenta"}
        </h2>
        <button className={styles.buttonSalir} onClick={salir}>{props.name?'Cerrar Sesión':'Salir'}</button>
      </div>
    </div>
  );
}
