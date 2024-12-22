import styles from "./PartyList.module.css";
export default function PartyList({ party, onSelected, isSelected }) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        console.log(`party selected: ${party.id}`);
        onSelected(party.id);
      }}
    >
      <div>
        <input
          type="radio"
          name="party"
          checked={isSelected}
          onChange={() => onSelected(party.id)}
        />
        <p>{party.partyName}</p>
      </div>
    </div>
  );
}
