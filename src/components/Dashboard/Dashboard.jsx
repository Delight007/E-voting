import { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GlobalContext } from "../Context/GlobalContext";
import PositionList from "../PositionList/PositionList";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const { position, setPosition } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchPosition() {
      try {
        const positionCollection = collection(db, "Position");
        const positionSnapshot = await getDocs(positionCollection);
        const positionList = positionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosition(positionList);
        console.log("positon List", positionList);
      } catch (err) {
        console.log("error position", err);
      }
    }
    fetchPosition();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Select to check candidates vote-counts</h3>
      <div className={styles.content}>
        {position.map((position) => (
          <div key={position.id} className={styles.detail}>
            <Link to={`/dashboard/${position.id}`} className={styles.Link}>
              <p className={styles.inLink}> {position.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
