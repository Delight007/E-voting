import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../FIrebase/Firebase";
import Candidates from "../Candidates/Candidates";
import { toast } from "react-toastify";
import styles from "./Vote.module.css";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function Vote() {
  const {
    selectCandidate,
    setSelectCandidate,
    candidates,
    setCandidates,
    selectedParty,
    selectedPosition,
    selectPosition,
  } = useContext(GlobalContext);

  // const params = useParams();
  const [isPending, setIspending] = useState(true);
  const [isVoting, setIsvoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!selectedParty || !selectedPosition) {
        setCandidates([]); // Reset candidates if filters are not set
        setIspending(false);
        return;
      }

      try {
        const candidatesCollection = collection(db, "Candidates");
        const q = query(
          candidatesCollection,
          where("partyId", "==", selectedParty),
          where("positionId", "==", selectedPosition)
        );

        const candidatesSnapshot = await getDocs(q);
        const candidateList = candidatesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Filtered Candidates:", candidateList);
        setCandidates(candidateList);
        setIspending(false);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setIspending(false);
      }
    };

    fetchCandidates();
  }, [selectedParty, selectedPosition, setCandidates]);

  function handleSelect(candidateId) {
    setSelectCandidate((prevSelected) =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter((id) => id !== candidateId)
        : [...prevSelected, candidateId]
    );
    setSelectedCandidate(candidateId);
  }

  async function addVotes() {
    if (selectCandidate.length === 0) {
      toast.error("please select a candidate", {
        position: "top-center",
      });
      return;
    }

    setIsvoting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        console.log("User Uid:", user.uid);
      } else {
        console.log("No user Id ");
      }

      const userId = user.uid;

      const votesCollection = collection(db, "Votes");
      const q = query(
        votesCollection,
        where("userId", "==", userId),
        where("positionId", "==", selectedPosition)
      );
      const existiingVotesSnapshot = await getDocs(q);

      if (!existiingVotesSnapshot.empty) {
        toast.error("You have already voted for this position.", {
          position: "top-center",
        });
        return;
      }

      for (const candidateId of selectCandidate) {
        const votesRef = doc(collection(db, "Votes"));
        await setDoc(votesRef, {
          userId,
          positionId: selectedPosition,
          candidateId,
          Timestamp: new Date(),
        });
      }

      for (const candidateId of selectCandidate) {
        const candidateDoc = doc(db, "Candidates", candidateId);
        await updateDoc(candidateDoc, {
          voteCount: increment(1),
        });
      }

      toast.success("vote submitted Successfully", {
        position: "top-right",
      });

      setSelectCandidate([]);
      navigate("/home");
    } catch (error) {
      console.error("Error incrementing votes: ", error);
      toast.error("Failed to submit your vote. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsvoting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPending && (
          <div>
            <h1>Loading......</h1>
          </div>
        )}
        <h2>Select Candidates</h2>
        {candidates.map((candidate) => (
          <div className={styles.candidate} key={candidate.id}>
            <div>
              <Candidates
                candidate={candidate}
                isSelected={selectedCandidate === candidate.id}
                onSelected={handleSelect}
              />
            </div>
          </div>
        ))}
        <button className={styles.btn} onClick={addVotes} disabled={isVoting}>
          {isVoting ? "Voting" : "Vote"}
        </button>
      </div>
    </div>
  );
}
