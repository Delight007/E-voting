import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../FIrebase/Firebase";
import styles from "./Party.module.css";
import PartyList from "../PartyList/PartyList";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { toast } from "react-toastify";

export default function Party() {
  const { selectParty, setSelectParty, selectedParty, setSelectedParty } =
    useContext(GlobalContext);
  const [parties, setParties] = useState([]);
  const [isPending, setIspending] = useState(true);
  // const [selectedParty, setSelectedParty] = useState(null);
  const [name, setName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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
        setIspending(false);
      } catch (err) {
        console.log("Error fetching party:", err);
        setIspending(false);
      }
    }

    fetchParties();
  }, []);

  function handleSelect(partyId) {
    setSelectParty((prevSelected) =>
      prevSelected.includes(partyId)
        ? prevSelected.filter((id) => id !== partyId)
        : [...prevSelected, partyId]
    );
    setSelectedParty(partyId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPending && (
          <div>
            <h1>Loading....</h1>
          </div>
        )}
        <h2>Select Party</h2>
        <div>
          {parties.map((party) => (
            <div key={party.id} className={styles.partyList}>
              <PartyList
                party={party}
                isSelected={selectedParty === party.id}
                onSelected={handleSelect}
              />
            </div>
          ))}
          {selectedParty && (
            <Link to="/position">
              <button>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
