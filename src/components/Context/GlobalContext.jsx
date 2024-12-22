import { Children, createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [selectPosition, setSelectPosition] = useState([]);
  const [selectParty, setSelectParty] = useState([]);
  const [selectCandidate, setSelectCandidate] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [position, setPosition] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        selectPosition,
        setSelectPosition,
        selectParty,
        setSelectParty,
        selectCandidate,
        setSelectCandidate,
        candidates,
        setCandidates,
        position,
        setPosition,
        selectedParty,
        setSelectedParty,
        selectedPosition,
        setSelectedPosition,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
