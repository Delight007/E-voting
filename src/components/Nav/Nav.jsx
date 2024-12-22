import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { FaTimes } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Mobile from "../Mobile/Mobile";
export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
  function toogleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <>
      <Mobile toogleMenu={toogleMenu} openMenu={openMenu} />
      <nav className={styles.nav}>
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
          <button className={styles.btn} onClick={toogleMenu}>
            {openMenu ? <FaTimes /> : <IoMenu />}
          </button>
        </div>
      </nav>
    </>
  );
}
