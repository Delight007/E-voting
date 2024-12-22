import { useState } from "react";
import styles from "./Register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIspending] = useState(false);
  const navigate = useNavigate();

  async function Register(e) {
    e.preventDefault();
    try {
      setIspending(true);
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        const uuid = uuidv4();
        await setDoc(doc(db, "Users", user.uid), {
          uuid,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          hasVoted: false,
        });
      }
      setIspending(false);
      console.log("Register Successfully");
      toast.success("Success notification!", {
        position: "top-right",
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setIspending(false);
      toast.error(err.message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <section>
      <div className={styles.container}>
        <form onSubmit={Register}>
          <h1>Register</h1>
          <div className={styles.m_content}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
            <label>Email</label>
            <input
              type="email"
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
            <br />
            <button disabled={isPending}>
              {isPending ? "Registering" : "Register"}
            </button>
            <br />
            <p className={styles.have}>
              Already have an accout? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
