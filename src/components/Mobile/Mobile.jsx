import styles from "./Mobile.module.css";
import { Link } from "react-router-dom";
export default function Mobile({ toogleMenu, openMenu }) {
  return (
    <div
      className={`${styles.container} ${openMenu ? styles.active : ""}`}
      onClick={toogleMenu}
    >
      <div className={styles.content}>
        <div className={styles.head}>
          <h1>Evoting</h1>
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/addDetail">Add Details</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
