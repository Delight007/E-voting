import styles from "./Details.module.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../FIrebase/Firebase";

export default function Details() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const detailsCollection = collection(db, "Candidates");
        const detailsSnapshot = await getDocs(detailsCollection);
        const detailsList = detailsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(detailsList);
        setDetails(detailsList);
      } catch (err) {
        console.log("Candidate deatails not fetch", err);
      }
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {details.map((detail) => (
          <div key={detail.id}>{detail.name}</div>
        ))}
      </div>
    </div>
  );
}
