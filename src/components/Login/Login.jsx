import { useState } from "react";
import styles from "./Login.module.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Login(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("Login Successfully");
      window.location.href = "/home";
      toast.success("Success notification!", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
        position: "bottom-center",
      });
    }
  }

  async function signWIthGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/home";
    } catch (err) {
      console.log("error", err);
    }
  }

  return (
    <section>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={Login}>
          <h1>Login</h1>
          <div className={styles.m_content}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className={styles.btn}>Sign In</button>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                signWIthGoogle();
              }}
            >
              Sign In With Google
            </button>
            <div className={styles.oR}>Or</div>
            <p className={styles.dont}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
