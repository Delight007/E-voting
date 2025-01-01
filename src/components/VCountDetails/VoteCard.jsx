import styles from "./VoteCard.module.css";
export default function VoteCard({ candidate }) {
  return (
    <div className={styles.card}>
      <h3>{candidate.name}</h3>

      <p>Votes: {candidate.voteCount}</p>
      <p>Party: {candidate.partyName || "Unknown"}</p>
    </div>
  );
}
