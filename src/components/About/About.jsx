import styles from "./About.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          {" "}
          <h1>About Us</h1>
          <p>
            Purpose Our platform is designed to simplify the voting process,
            making it secure, transparent, and user-friendly. We aim to empower
            organizations, institutions, and communities to conduct fair
            elections with ease.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>
              <span>Secure Voting:</span> Leveraging advanced encryption and
              authentication to ensure every vote is safe.
            </li>
            <li>
              <span>Real-Time Results:</span> Get instant insights as votes are
              tallied.
            </li>
            <li>
              <span>User-Friendly Interface:</span> Simple and intuitive design
              for all users, regardless of technical expertise.
            </li>
          </ul>
          <h3>How It Works </h3>
          <ol>
            <li>
              <span>Sign Up:</span> Register as a voter or administrator on the
              platform.
            </li>
            <li>
              <span>Select Your Position:</span> Navigate to the position you
              wish to vote for.
            </li>
            <li>
              <span>Vote:</span> Cast your vote securely and confirm your
              selection.
            </li>
          </ol>
          <h3> Our Mission</h3>
          <p>
            To create a transparent and accessible voting experience that
            fosters trust and participation in elections of all sizes.
          </p>
          <h3> Impact</h3>
          <p>
            Our app is transforming elections by reducing manual errors, saving
            time, and encouraging broader participation. Whether it’s a school
            election, corporate poll, or community decision, our solution
            ensures fairness and efficiency.
          </p>
          <h3>Meet the Team</h3>
          <p>
            We are a passionate group of developers and innovators dedicated to
            using technology to drive positive change.
          </p>
        </div>
      </div>
    </div>
  );
}
