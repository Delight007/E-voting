import { useEffect, useState } from "react";
import styles from "./AddDetails.module.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../FIrebase/Firebase";
import { toast } from "react-toastify";
export default function AddDetails() {
  const [addCandidate, setAddCandidate] = useState("");
  const [addParty, setAddParty] = useState("");
  const [addPosition, setAddPosition] = useState("");
  const [parties, setParties] = useState([]);
  const [positions, setPosition] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchParties() {
      try {
        const partiesCollection = collection(db, "Parties");
        const partySnapshot = await getDocs(partiesCollection);
        const partyList = partySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Parties List", partyList);
        setParties(partyList);
      } catch (err) {
        console.log("no party available:", err);
        toast.error("no party available", { position: "top-right" });
      }
    }
    fetchParties();
  }, []);

  useEffect(() => {
    async function fetchPosition() {
      try {
        const positionCollection = collection(db, "Position");
        const positionSnapshot = await getDocs(positionCollection);
        const positionList = positionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("position List:", positionList);
        setPosition(positionList);
      } catch (err) {
        console.log("no position available", err);
        toast.error("no position available", {
          position: "top-center",
        });
      }
    }
    fetchPosition();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!addParty || !addPosition || !addCandidate) {
      toast.error("fill in the field...");
      return;
    }
    try {
      await addDoc(collection(db, "Candidates"), {
        name: addCandidate,
        partyId: Number(addParty),
        positionId: Number(addPosition),
      });
      toast.success("Successfully added candidate");
      setAddCandidate("");
      setAddParty("");
      setAddPosition("");
    } catch (err) {
      console.log("Candidate not added");
      toast.error("Candidate not added...");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.addCandidateContainer}>
        <div className={styles.addCandidateContent}>
          <h2>Add Candidate</h2>
          <form onSubmit={handleSubmit} className={styles.addCandidate}>
            <input
              type="text"
              value={addCandidate}
              onChange={(e) => setAddCandidate(e.target.value)}
              placeholder="Enter position"
            />

            <select
              onChange={(e) => setAddParty(e.target.value)}
              value={addParty}
            >
              <option value=" "> select a party</option>
              {parties.map((party) => (
                <option key={party.id} value={party.id}>
                  {party.partyName}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setAddPosition(e.target.value)}
              value={addPosition}
            >
              <option value=" "> select a position</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
            <button className={styles.btn}>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
