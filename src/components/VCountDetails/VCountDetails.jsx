import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FIrebase/Firebase";
import VoteCard from "./VoteCard";
import { useParams } from "react-router-dom";
import styles from "./VCountDetails.module.css";

export default function VCountDetails() {
  const { candidates, setCandidates } = useContext(GlobalContext);
  const { positionId } = useParams();

  useEffect(() => {
    console.log("position ID:", positionId);

    async function fetchCandidates() {
      try {
        const candidatesCollection = collection(db, "Candidates");

        const positionIdInt = parseInt(positionId, 10);
        const q = query(
          candidatesCollection,
          where("positionId", "==", positionIdInt)
        );
        const candidatesSnapshot = await getDocs(q);
        console.log("Number of candidates:", candidatesSnapshot.size);
        const candidatesList = candidatesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(candidatesList);
        console.log("Candidates List", candidatesList);
      } catch (err) {
        console.log("No candidates Available", err);
      }
    }
    fetchCandidates();
  }, [setCandidates, positionId]);

  return (
    <div className={styles.container}>
      <div>
        {candidates.map((candidate) => (
          <div key={candidate.id} className={styles.content}>
            <VoteCard candidate={candidate} />
          </div>
        ))}
      </div>
    </div>
  );
}
