import { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FIrebase/Firebase";
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
      <div className={styles.content}>
        {position.map((position) => (
          <div key={position.id} className={styles.detail}>
            <Link to={`/dashboard/${position.id}`} className={styles.Link}>
              <div className={styles.inLink}> {position.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
