import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styles from "./Position.module.css";
import { db } from "../../firebase/firebase";
import PositionList from "../PositionList/PositionList";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { toast } from "react-toastify";

export default function Position() {
  const [isPending, setIspending] = useState(true);
  const [positionName, setPositionName] = useState("");

  const {
    selectParty,
    setSelectPosition,
    selectPosition,
    position,
    setPosition,
    selectedPosition,
    setSelectedPosition,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchPosition() {
      try {
        // Fetch positions collection from Firestore
        const positionCollection = collection(db, "Position");
        const positionSnapshot = await getDocs(positionCollection);
        const PositionsList = positionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Position List:", PositionsList);

        setPosition(PositionsList);
        setIspending(false);
      } catch (err) {
        console.log("Error fetching positions: ", err);
        setIspending(false);
      }
    }

    fetchPosition();
  }, [setPosition]);

  // Handle position selection
  function handleSelect(positionId) {
    setSelectPosition((prevSelected) =>
      prevSelected.includes(positionId)
        ? prevSelected.filter((id) => id !== positionId)
        : [...prevSelected, positionId]
    );
    setSelectedPosition(positionId);
    const position_name = position.find((pos) => pos.id === positionId);

    setPositionName(position_name.name || " ");
  }

  // console.log(position.);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPending && (
          <div>
            <h1>Loading....</h1>
          </div>
        )}
        <h2>Select Position</h2>
        <div>
          {position.map((position) => (
            <div key={position.id}>
              <PositionList
                position={position}
                isSelected={selectedPosition === position.id}
                onSelected={handleSelect}
              />
            </div>
          ))}
          {selectedPosition && (
            <Link to={`/${positionName}`}>
              <button>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
