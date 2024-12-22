import styles from "./Home.module.css";
import voteImg from "../img/voteImg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={styles.Home}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Welcome To Evoting</h1>
          <p>"Make Your Vote Count"</p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#FF5722" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.btn}
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/vote"
            >
              Vote Now
            </Link>
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className={styles.img}
        >
          <img src={voteImg} alt="" />
        </motion.div>
      </div>
    </motion.div>
  );
}
