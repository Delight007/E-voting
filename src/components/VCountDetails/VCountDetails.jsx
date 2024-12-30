import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import VoteCard from "./VoteCard";
import { useParams } from "react-router-dom";
import styles from "./VCountDetails.module.css";

export default function VCountDetails() {
  const { candidates, setCandidates } = useContext(GlobalContext);
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
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
        setCandidates(candidatesList.sort((a, b) => b.voteCount - a.voteCount));
        console.log("Candidates List", candidatesList);
      } catch (err) {
        console.log("No candidates Available", err);
      }
    }

    async function fetchParties() {
      try {
        const partyCollection = collection(db, "Parties");
        const partySnapshot = await getDocs(partyCollection);
        const partyList = partySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Party List:", partyList);

        setParties(partyList);
      } catch (err) {
        console.log("Error fetching party:", err);
      }
    }
    fetchCandidates();
    fetchParties();
  }, [setCandidates, positionId]);

  useEffect(() => {
    console.log("Selected Party:", selectedParty);
    console.log("Candidates:", candidates);

    if (selectedParty === "") {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter(
        (candidate) => candidate.partyId === selectedParty
      );
      setFilteredCandidates(filtered);
      console.log("Filtered Candidates:", filtered);
    }
  }, [selectedParty, candidates]);

  return (
    <div className={styles.container}>
      <div>
        <select
          onChange={(e) => setSelectedParty(Number(e.target.value))}
          value={selectedParty}
          className={styles.select}
        >
          <option value="select a party">
            select party to check candidate votes
          </option>

          {parties.map((party) => (
            <option key={party.id} value={party.id}>
              {party.partyName}
            </option>
          ))}
        </select>
        <h3>Overall Winner</h3>
        <div className={styles.mCont}>
          {filteredCandidates.map((candidate) => (
            <div className={styles.content}>
              <VoteCard key={candidate.id} candidate={candidate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
