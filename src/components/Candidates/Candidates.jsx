import styles from "./Candidates.module.css";
export default function Candidates({ candidate, isSelected, onSelected }) {
  return (
    <div className={styles.container} onClick={() => onSelected(candidate.id)}>
      <div>
        <input
          type="radio"
          name="candidates"
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onSelected(candidate.id)}
        />

        <p>{candidate.name}</p>
      </div>
    </div>
  );
}
