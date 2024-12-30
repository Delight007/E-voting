import styles from "./VoteCard.module.css";
export default function VoteCard({ candidate }) {
  return (
    <div className={styles.card}>
      <p>{candidate.name}</p>

      <h3>Votes: {candidate.voteCount}</h3>
    </div>
  );
}
