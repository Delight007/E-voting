import styles from "./PositionList.module.css";
export default function PositionList({ position, isSelected, onSelected }) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        console.log(`Position Selected: ${position.id}`);
        onSelected(position.id);
      }}
    >
      <div>
        <input
          type="radio"
          name="position"
          checked={isSelected}
          onChange={() => onSelected(position.id)}
        />
        <p>{position.name}</p>
      </div>
    </div>
  );
}
